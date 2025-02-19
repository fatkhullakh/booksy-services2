package com.example.controller;

import com.example.dto.ShopCreateUpdateDTO;
import com.example.model.Shop;
import com.example.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/api/shops")
public class ShopController {

    @Autowired
    private ShopService shopService;
    @Autowired
    private RestTemplate restTemplate;

    @PostMapping
    public ResponseEntity<Shop> createShop(@RequestBody ShopCreateUpdateDTO dto) {
        Shop shop = new Shop(dto.getName(), dto.getLocation(), dto.getPhoneNumber(), dto.getEmail(), dto.getOwnerName(), dto.getRating());
        Shop savedShop = shopService.save(shop);
        return new ResponseEntity<>(savedShop, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shop> getShopById(@PathVariable UUID id) {
        return shopService.findById(id)
                .map(shop -> ResponseEntity.ok(shop))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
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
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteShop(@PathVariable UUID id) {
        // Step 1: Delete the shop locally
        shopService.deleteById(id);

        // Step 2: Notify the Service Management Application
        try {
            String notificationUrl = "http://localhost:8081/api/services/shop-removed/" + id;
            restTemplate.delete(notificationUrl);
        } catch (Exception e) {
            // Log an error if the notification fails
            System.err.println("Failed to notify Service Management Application: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllShops() {
        try {
            List<Shop> shops = shopService.findAll();
            return ResponseEntity.ok(shops);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching shops: " + e.getMessage());
        }
    }




}
