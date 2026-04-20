package com.vehiclerental.vehiclerental.serviceImpl;

import com.vehiclerental.vehiclerental.dto.BookingRequestDTO;
import com.vehiclerental.vehiclerental.entity.Booking;
import com.vehiclerental.vehiclerental.repository.BookingRepository;
import com.vehiclerental.vehiclerental.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Booking createBooking(BookingRequestDTO requestDTO) {
        Booking booking = new Booking();
        booking.setUserId(requestDTO.getUserId());
        booking.setVehicleId(requestDTO.getVehicleId());
        booking.setStartDate(requestDTO.getStartDate());
        booking.setEndDate(requestDTO.getEndDate());
        booking.setStatus("PENDING");

        return bookingRepository.save(booking);
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Override
    public List<Booking> getBookingsByUserId(Long userId) {
        // Find all approach can be optimized via custom rep methods but we do manual filtering for simplicity if method doesn't exist
        return bookingRepository.findAll().stream()
                .filter(b -> b.getUserId().equals(userId))
                .toList();
    }

    @Override
    public Booking cancelBooking(Long id) {
        Booking booking = getBookingById(id);
        booking.setStatus("CANCELLED");
        return bookingRepository.save(booking);
    }
}
