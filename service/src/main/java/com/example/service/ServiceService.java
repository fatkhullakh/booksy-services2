package com.example.service;

import com.example.model.ServiceEntity;
import com.example.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public ServiceEntity save(ServiceEntity service) {
        return serviceRepository.save(service);
    }

    public List<ServiceEntity> findAll() {
        return serviceRepository.findAll();
    }

    public Optional<ServiceEntity> findById(UUID id) {
        return serviceRepository.findById(id);
    }

    public void deleteById(UUID id) {
        serviceRepository.deleteById(id);
    }

    public List<ServiceEntity> findByShopId(UUID shopId) {
        return serviceRepository.findByShopId(shopId);
    }

    public List<UUID> deleteAllByShopId(UUID shopId) {
        // Retrieve all services related to the shop
        List<ServiceEntity> services = serviceRepository.findByShopId(shopId);

        // Extract the IDs of the services
        List<UUID> serviceIds = services.stream()
                .map(ServiceEntity::getServiceId)
                .collect(Collectors.toList());

        // Delete all the services
        serviceRepository.deleteAll(services);

        // Return the IDs of the deleted services
        return serviceIds;
    }

}
