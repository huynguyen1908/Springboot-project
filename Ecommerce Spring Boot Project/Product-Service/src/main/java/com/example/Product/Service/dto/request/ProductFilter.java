package com.example.Product.Service.dto.request;

import lombok.Data;

@Data
public class ProductFilter {
    String name;
    String skuCode;
    String brand;
    String category;
    String color;
    String size;
    Double minPrice;
    Double maxPrice;
}
