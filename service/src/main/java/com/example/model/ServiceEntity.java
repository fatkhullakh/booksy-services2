package com.example.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString(callSuper = true)
@EqualsAndHashCode()
@SuperBuilder()
@Data
@Entity
@Table(name = "services")
public class ServiceEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private UUID serviceId = UUID.randomUUID();

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "duration", nullable = false)
    private int duration; // in minutes

    @Column(name = "service_category", nullable = false)
    private String serviceCategory;

    @Column(name = "shop_id", nullable = false)
    private UUID shopId;

    public ServiceEntity(String name, Double price, int duration, String serviceCategory, UUID shopId) {
        this.name = name;
        this.price = price;
        this.duration = duration;
        this.serviceCategory = serviceCategory;
        this.shopId = shopId;
    }

    public ServiceEntity(UUID randomUUID, String name, Double price, int duration, String serviceCategory) {
        this.serviceId = randomUUID;
        this.name = name;
        this.price = price;
        this.duration = duration;
        this.serviceCategory = serviceCategory;
    }

    public UUID getServiceId() {
        return serviceId;
    }

    public String name() {
        return name;
    }

    public double price() {
        return price;
    }

    public int duration() {
        return duration;
    }

    public String serviceCategory() {
        return serviceCategory;
    }

    public UUID getShopId() {
        return shopId;
    }

    public void setShopId(UUID shopId) {
        this.shopId = shopId;
    }
}