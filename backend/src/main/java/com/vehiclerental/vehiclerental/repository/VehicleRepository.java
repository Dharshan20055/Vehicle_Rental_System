package com.vehiclerental.vehiclerental.repository;

import com.vehiclerental.vehiclerental.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByType(String type);
    List<Vehicle> findByAvailabilityStatus(String status);
}
