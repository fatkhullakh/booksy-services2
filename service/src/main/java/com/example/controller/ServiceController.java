package com.example.controller;

import com.example.dto.ServiceCreateUpdateDTO;
import com.example.dto.ServiceReadDTO;
import com.example.model.ServiceEntity;
import com.example.model.Shop;
import com.example.service.ServiceService;
import com.example.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;
    @Autowired
    private ShopService shopService;

    // POST: Create a new service
    @PostMapping
    public ResponseEntity<ServiceEntity> createService(@RequestBody ServiceCreateUpdateDTO dto) {
        ServiceEntity service = new ServiceEntity(dto.getName(), dto.getPrice(), dto.getDuration(), dto.getServiceCategory(), dto.getShopId());
        return new ResponseEntity<>(serviceService.save(service), HttpStatus.CREATED);
    }

//    @PostMapping("/{id}/services")
//    public ResponseEntity<ServiceEntity> addServiceToShop(@PathVariable UUID id, @RequestBody Service service) {
//        Shop shop = shopService.findById(id)
//                .orElseThrow(() -> new RuntimeException("Shop not found"));
//
//        service.setShop(shop);
//        Service savedService = serviceService.save(service);
//        return new ResponseEntity<>(savedService, HttpStatus.CREATED);
//    }



    @GetMapping
    public ResponseEntity<List<ServiceReadDTO>> getAllServices() {
        List<ServiceReadDTO> services = serviceService.findAll().stream()
                .map(service -> new ServiceReadDTO(
                        service.getServiceId(),
                        service.getName(),
                        service.getPrice(),
                        service.getDuration(),
                        service.getServiceCategory(),
                        service.getShopId()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(services);
    }


    // PUT: Update an existing service
    @PutMapping("/{id}")
    public ResponseEntity<ServiceEntity> updateService(@PathVariable UUID id, @RequestBody ServiceCreateUpdateDTO dto) {
        ServiceEntity existingService = serviceService.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found")); // Replace with a custom exception if needed
        existingService.setName(dto.getName());
        existingService.setPrice(dto.getPrice());
        ServiceEntity updatedService = serviceService.save(existingService);
        return new ResponseEntity<>(updatedService, HttpStatus.OK);
    }

    @DeleteMapping("/shop-removed/{shopId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void handleShopRemoved(@PathVariable UUID shopId) {
        // Step 1: Find and delete all services linked to the shop
        List<UUID> serviceIds = serviceService.deleteAllByShopId(shopId);

        // Log or handle any additional logic for cleanup
        System.out.println("Deleted services for shop: " + shopId + ". Service IDs: " + serviceIds);
    }

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<ServiceEntity>> getServicesByShopId(@PathVariable UUID shopId) {
        List<ServiceEntity> services = serviceService.findByShopId(shopId);
        return ResponseEntity.ok(services);
    }



}
