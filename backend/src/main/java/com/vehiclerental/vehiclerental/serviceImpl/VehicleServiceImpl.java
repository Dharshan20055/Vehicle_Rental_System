package com.vehiclerental.vehiclerental.serviceImpl;

import com.vehiclerental.vehiclerental.entity.Vehicle;
import com.vehiclerental.vehiclerental.repository.VehicleRepository;
import com.vehiclerental.vehiclerental.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id).orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
    }

    @Override
    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updateVehicle(Long id, Vehicle vehicleDetails) {
        Vehicle vehicle = getVehicleById(id);
        vehicle.setBrand(vehicleDetails.getBrand());
        vehicle.setModel(vehicleDetails.getModel());
        vehicle.setType(vehicleDetails.getType());
        vehicle.setFuelType(vehicleDetails.getFuelType());
        vehicle.setSeatingCapacity(vehicleDetails.getSeatingCapacity());
        vehicle.setPricePerDay(vehicleDetails.getPricePerDay());
        vehicle.setAvailabilityStatus(vehicleDetails.getAvailabilityStatus());
        vehicle.setImageUrl(vehicleDetails.getImageUrl());
        vehicle.setDescription(vehicleDetails.getDescription());
        vehicle.setInsuranceStatus(vehicleDetails.getInsuranceStatus());
        vehicle.setRegistrationNumber(vehicleDetails.getRegistrationNumber());
        return vehicleRepository.save(vehicle);
    }

    @Override
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    @Override
    public List<Vehicle> filterVehicles(String type, String status) {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        if (type != null && !type.isEmpty()) {
            vehicles = vehicles.stream()
                    .filter(v -> v.getType().equalsIgnoreCase(type))
                    .collect(Collectors.toList());
        }
        if (status != null && !status.isEmpty()) {
            vehicles = vehicles.stream()
                    .filter(v -> v.getAvailabilityStatus().equalsIgnoreCase(status))
                    .collect(Collectors.toList());
        }
        return vehicles;
    }
}
