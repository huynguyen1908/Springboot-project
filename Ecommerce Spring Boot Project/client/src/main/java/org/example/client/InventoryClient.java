package org.example.client;

import org.example.dto.request.InventoryCheckRequest;
import org.example.dto.request.StockUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "inventory-service")
public interface InventoryClient {
    @PostMapping("/api/inventory/check-stock")
    boolean isInStock(@RequestBody List<InventoryCheckRequest> items);

    @PutMapping("/api/inventory/update-stock")
    void updateStockQuantity(@RequestBody List<StockUpdateRequest> items, @RequestParam("isOrderCancelled") boolean isOrderCancelled);

    @GetMapping("/api/inventory/{skuCode}")
    int getStockByProduct(@PathVariable("skuCode") String skuCode) ;

    @PostMapping("/api/inventory/add-stock")
    void addStock(@RequestParam("skuCode") String skuCode, @RequestParam("name") String name, @RequestParam("quantity") int quantity, @RequestParam("importPrice") double importPrice);
}