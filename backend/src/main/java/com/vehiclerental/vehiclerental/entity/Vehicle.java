package com.vehiclerental.vehiclerental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;
    private String type; // CAR, BIKE, VAN, TRUCK
    private String fuelType;
    private int seatingCapacity;
    private double pricePerDay;
    private String availabilityStatus; // AVAILABLE, MAINTENANCE, RENTED
    private String imageUrl;
    
    @Column(length = 1000)
    private String description;
    
    private String insuranceStatus;
    private String registrationNumber;
}
