package com.example.Order.Service.dto.request;

import com.example.Order.Service.dto.response.OrderDetailDTO;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderRequest {
    String orderId;
    String shippingMethod;
    String paymentMethod;
    String address;
    List<OrderDetailDTO> orderDetailList;
}
