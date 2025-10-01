package org.example.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/api/product/get-productName/{skuCode}")
    String getProductNameBySkuCode(@PathVariable("skuCode") String skuCode);

    @PostMapping("/api/cart/create")
    void createCart(@RequestParam("userId") String userId);
}
