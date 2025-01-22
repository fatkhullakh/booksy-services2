package com.example.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("shop-service", r -> r.path("/api/shops/**")
                        .uri("http://localhost:8081")) // Replace with the port of your Shop service
                .route("service-service", r -> r.path("/api/services/**")
                        .uri("http://localhost:8082")) // Replace with the port of your Service service
                .build();
    }
}
