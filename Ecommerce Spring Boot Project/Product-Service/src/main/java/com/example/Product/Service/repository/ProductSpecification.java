package com.example.Product.Service.repository;

import com.example.Product.Service.dto.request.ProductFilter;
import com.example.Product.Service.dto.response.ProductDTO;
import com.example.Product.Service.entity.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {
    public static Specification<Product> getProductByFilter(ProductFilter filter, Pageable pageable) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicate = new ArrayList<Predicate>();
            if(filter.getName() != null) {
                predicate.add(criteriaBuilder.like(root.get("name"), "%" + filter.getName() + "%"));
            }
            if(filter.getSkuCode() != null) {
                predicate.add(criteriaBuilder.equal(root.get("skuCode"), filter.getSkuCode()));
            }
            if(filter.getBrand() != null) {
                predicate.add(criteriaBuilder.equal(root.get("brand"), filter.getBrand()));
            }
            if(filter.getCategory() != null) {
                predicate.add(criteriaBuilder.equal(root.get("category").get("name"), filter.getCategory()));
            }
            if(filter.getColor() != null) {
                predicate.add(criteriaBuilder.equal(root.get("color"), filter.getColor()));
            }
            if(filter.getSize() != null) {
                predicate.add(criteriaBuilder.equal(root.get("size"), filter.getSize()));
            }
            if(filter.getMinPrice() != null) {
                predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), filter.getMinPrice()));
            }
            if(filter.getMaxPrice() != null) {
                predicate.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), filter.getMaxPrice()));
            }
            return criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        };
    }
}
