package com.vehiclerental.vehiclerental.service;

import com.vehiclerental.vehiclerental.entity.Vehicle;
import java.util.List;

public interface VehicleService {
    List<Vehicle> getAllVehicles();
    Vehicle getVehicleById(Long id);
    Vehicle addVehicle(Vehicle vehicle);
    Vehicle updateVehicle(Long id, Vehicle vehicle);
    void deleteVehicle(Long id);
    List<Vehicle> filterVehicles(String type, String status);
}
