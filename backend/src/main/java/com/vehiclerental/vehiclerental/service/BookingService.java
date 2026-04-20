package com.vehiclerental.vehiclerental.service;

import com.vehiclerental.vehiclerental.dto.BookingRequestDTO;
import com.vehiclerental.vehiclerental.entity.Booking;

import java.util.List;

public interface BookingService {
    Booking createBooking(BookingRequestDTO requestDTO);
    Booking getBookingById(Long id);
    List<Booking> getBookingsByUserId(Long userId);
    Booking cancelBooking(Long id);
}
