package com.example.controller;

import com.example.dto.ShopCreateUpdateDTO;
import com.example.model.Shop;
import com.example.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @PostMapping
    public ResponseEntity<Shop> createShop(@RequestBody ShopCreateUpdateDTO dto) {
        Shop shop = new Shop(dto.getName(), dto.getLocation(), dto.getPhoneNumber(), dto.getEmail(), dto.getOwnerName(), dto.getRating());
        Shop savedShop = shopService.save(shop);
        return new ResponseEntity<>(savedShop, HttpStatus.CREATED);
    }



    // PUT: Update an existing shop
    @PutMapping("/{id}")
    public ResponseEntity<Shop> updateShop(@PathVariable UUID id, @RequestBody ShopCreateUpdateDTO dto) {
        Shop existingShop = shopService.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found")); // Replace with a custom exception if needed
        existingShop.setName(dto.getName());
        existingShop.setLocation(dto.getLocation());
        existingShop.setPhoneNumber(dto.getPhoneNumber());
        existingShop.setEmail(dto.getEmail());
        existingShop.setOwnerName(dto.getOwnerName());
        existingShop.setRating(dto.getRating());
        Shop updatedShop = shopService.save(existingShop);
        return new ResponseEntity<>(updatedShop, HttpStatus.OK);
    }

    // DELETE: Delete a shop
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShop(@PathVariable UUID id) {
        shopService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<Shop>> getAllShops() {
        List<Shop> shops = shopService.findAll();
        return ResponseEntity.ok(shops);
    }

}
