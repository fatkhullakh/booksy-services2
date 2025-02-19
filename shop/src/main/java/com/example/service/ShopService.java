package com.example.service;

import com.example.model.Shop;
import com.example.repository.ShopRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ShopService {

    private final ShopRepository shopRepository;

    @Autowired
    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public List<Shop> findAll() {
        List<Shop> shops = shopRepository.findAll();
        if (shops == null) {
            throw new RuntimeException("No shops found.");
        }
        return shops;
    }

    public Optional<Shop> findById(UUID id) {
        return shopRepository.findById(id);
    }

    public Shop save(Shop shop) {
        return shopRepository.save(shop);
    }

    public void deleteById(UUID id) {
        shopRepository.deleteById(id);
    }
}

