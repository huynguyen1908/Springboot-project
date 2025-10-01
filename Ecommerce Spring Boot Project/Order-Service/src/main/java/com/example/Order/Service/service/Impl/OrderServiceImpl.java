package com.example.Order.Service.service.Impl;

import com.example.Order.Service.dto.request.OrderRequest;
import com.example.Order.Service.dto.response.OrderDTO;
import com.example.Order.Service.dto.response.OrderDetailDTO;
import com.example.Order.Service.entity.Order;
import com.example.Order.Service.entity.OrderDetail;
import com.example.Order.Service.enums.Status;
import com.example.Order.Service.event.OrderCreatedEvent;
import com.example.Order.Service.mapper.OrderMapper;
import com.example.Order.Service.repository.OrderRepository;
import com.example.Order.Service.service.OrderService;
import jakarta.transaction.Transactional;
import org.example.client.InventoryClient;
import org.example.client.ProductClient;
import org.example.client.UserClient;
import org.example.dto.request.InventoryCheckRequest;
import org.example.dto.request.StockUpdateRequest;
import org.example.dto.response.ApiResponse;
import org.example.dto.response.PageResponse;
import org.example.exception.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderMapper orderMapper;

    private final InventoryClient inventoryClient;
    private final UserClient userClient;
    private final ProductClient productClient;

    @Autowired
    private KafkaTemplate<String, OrderCreatedEvent> orderCreatedEventKafkaTemplate;

    @Autowired
    public OrderServiceImpl(InventoryClient inventoryClient, UserClient userClient, ProductClient productClient) {
        this.inventoryClient = inventoryClient;
        this.userClient = userClient;
        this.productClient = productClient;
    }

    @Override
    @Transactional
    public ApiResponse<Object> placeOrder(OrderRequest request) {
        List<InventoryCheckRequest> checkRequests = request.getOrderDetailList().stream()
                .map(item -> new InventoryCheckRequest(item.getSkuCode(), item.getQuantity()))
                .collect(Collectors.toList());
        boolean inStock = inventoryClient.isInStock(checkRequests);
        if (!inStock) throw new RuntimeException("Some products are out of stock.");

        Order order = orderMapper.requestToOrder(request);
        String userId = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        order.setUserId(userId);
        order.setCreatedAt(LocalDateTime.now());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Status.PENDING);

        for (OrderDetail detail : order.getOrderDetailList()) {
            detail.setOrder(order);
        }

        orderRepository.save(order);

        List<StockUpdateRequest> updateRequests = request.getOrderDetailList().stream()
                .map(item -> new StockUpdateRequest(item.getSkuCode(), item.getQuantity()))
                .collect(Collectors.toList());

        inventoryClient.updateStockQuantity(updateRequests, false);

        OrderCreatedEvent event = new OrderCreatedEvent(
                order.getUserId(),
                "Bạn đã đặt đơn hàng #" + order.getOrderId() + " thành công.",
                order.getOrderId()
        );
        orderCreatedEventKafkaTemplate.send("order-placed-topic", event);

        return ApiResponse.builder()
                .code(StatusCode.SUCCESS.getCode())
                .message(StatusCode.SUCCESS.getMessage())
                .data(orderMapper.toDTO(order))
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<Object> cancelOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(Status.CANCELED);
        order.setShippedAt(null);
        orderRepository.save(order);
        List<StockUpdateRequest> requests = order.getOrderDetailList().stream()
                .map(item -> new StockUpdateRequest(item.getSkuCode(), item.getQuantity()))
                .collect(Collectors.toList());

        inventoryClient.updateStockQuantity(requests, true);
        return ApiResponse.builder()
                .code(StatusCode.SUCCESS.getCode())
                .message("Order canceled successfully")
                .data(null)
                .build();
    }

    @Override
    public ApiResponse<Object> getOrderHistoryByUser(String userId, Pageable pageable) {
        Page<OrderDTO> orderList = orderRepository.findByUserId(userId, pageable).map(orderMapper::toDTO);
        if (orderList.isEmpty()) {
            return ApiResponse.builder()
                    .code(StatusCode.DATA_NOT_EXISTED.getCode())
                    .message("No orders found for user: " + userId)
                    .data(null)
                    .build();
        }
        return ApiResponse.builder()
                .code(StatusCode.SUCCESS.getCode())
                .message(StatusCode.SUCCESS.getMessage())
                .data(new PageResponse<>(orderList.getContent(), orderList.getTotalPages(), orderList.getTotalElements()))
                .build();
    }

    @Override
    public ApiResponse<Object> getOrderDetails(String orderId) {
        OrderDTO orderDTO = orderRepository.findById(orderId).map(orderMapper::toDTO).orElseThrow();
        orderDTO.setUsername(userClient.getUsernameByUserId(orderDTO.getUserId()));
        Double total = orderDTO.getOrderDetailList().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        orderDTO.setTotalAmount(total);
        orderDTO.getOrderDetailList().parallelStream().forEach(orderDetail -> {
            orderDetail.setProductName(productClient.getProductNameBySkuCode(orderDetail.getSkuCode()));
            System.out.println(orderDetail.getProductName() + " " + orderDetail.getPrice());
        });
        return ApiResponse.builder()
                .code(StatusCode.SUCCESS.getCode())
                .message(StatusCode.SUCCESS.getMessage())
                .data(orderDTO)
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<Object> updateOrderStatus(String orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        try {
            order.setStatus(Status.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }

        if (order.getStatus().toString().toUpperCase().equals(Status.SHIPPED.toString())) {
            order.setShippedAt(LocalDateTime.now());
        }

        orderRepository.save(order);
        return ApiResponse.builder()
                .code(StatusCode.SUCCESS.getCode())
                .message("Order status updated successfully")
                .data(orderMapper.toDTO(order))
                .build();
    }

    @Override
    public ApiResponse<Object> getListOrder(Pageable pageable) {
        Page<OrderDTO> orderDTOList = orderRepository.findAll(pageable).map(order -> {
            OrderDTO dto = orderMapper.toDTO(order);
            dto.setUsername(userClient.getUsernameByUserId(order.getUserId()));
            Double total = order.getOrderDetailList().stream()
                    .mapToDouble(item -> item.getPrice() * item.getQuantity())
                    .sum();
            dto.setTotalAmount(total);
            dto.getOrderDetailList().parallelStream().forEach(orderDetail -> {
                orderDetail.setProductName(productClient.getProductNameBySkuCode(orderDetail.getSkuCode()));
            });
            return dto;
        });

        return ApiResponse.builder()
                .code(StatusCode.SUCCESS.getCode())
                .message(StatusCode.SUCCESS.getMessage())
                .data(new PageResponse<>(orderDTOList.getContent(), orderDTOList.getTotalPages(), orderDTOList.getTotalElements()))
                .build();
    }
}
