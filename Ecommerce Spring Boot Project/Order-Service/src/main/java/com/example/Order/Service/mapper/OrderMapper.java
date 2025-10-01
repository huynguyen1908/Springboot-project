package com.example.Order.Service.mapper;


import com.example.Order.Service.dto.request.OrderRequest;
import com.example.Order.Service.dto.response.OrderDTO;
import com.example.Order.Service.dto.response.OrderDetailDTO;
import com.example.Order.Service.entity.Order;
import com.example.Order.Service.entity.OrderDetail;
import lombok.Data;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;


@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderDTO toDTO(Order order);
    Order toOrder(OrderDTO orderDTO);

    @Mapping(source = "price", target = "price")
    OrderDetailDTO toDetailDTO(OrderDetail detail);
    @Mapping(source = "price", target = "price")
    OrderDetail toDetail(OrderDetailDTO dto);

    List<OrderDetailDTO> toDetailDTOList(List<OrderDetail> details);
    List<OrderDetail> toDetailList(List<OrderDetailDTO> dtos);

    Order requestToOrder(OrderRequest request);
}
