package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import static com.example.model.Shop.readFromFile;
//import static com.example.model.Shop.saveToFile;

@SpringBootApplication
public class ShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopApplication.class, args);

    }
}


/*
{
  "name": "Shop Example",
  "location": "123 Example St",
  "phoneNumber": "123456789",
  "email": "example@shop.com",
  "ownerName": "John Doe",
  "rating": 4.5
}


{
  "name": "Service Example",
  "price": 99.99,
  "duration": 60,
  "serviceCategory": "Category A",
  "shopId": "6390e6de-644c-424f-827d-9e3d50c7f35d"
}

 */
