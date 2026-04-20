package com.vehiclerental.vehiclerental.repository;

import com.vehiclerental.vehiclerental.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
