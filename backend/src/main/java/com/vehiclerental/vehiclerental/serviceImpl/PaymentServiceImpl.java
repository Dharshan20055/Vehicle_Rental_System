package com.vehiclerental.vehiclerental.serviceImpl;

import com.vehiclerental.vehiclerental.dto.PaymentRequestDTO;
import com.vehiclerental.vehiclerental.dto.PaymentResponseDTO;
import com.vehiclerental.vehiclerental.entity.Booking;
import com.vehiclerental.vehiclerental.entity.Payment;
import com.vehiclerental.vehiclerental.repository.BookingRepository;
import com.vehiclerental.vehiclerental.repository.PaymentRepository;
import com.vehiclerental.vehiclerental.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public PaymentResponseDTO createPaymentIntent(PaymentRequestDTO requestDTO) throws Exception {
        Booking booking = bookingRepository.findById(requestDTO.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Save local payment record (SIMULATED)
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(requestDTO.getAmount());
        payment.setMethod(requestDTO.getMethod());
        payment.setStatus("PENDING");
        payment.setTransactionId("TRANS_" + UUID.randomUUID().toString().substring(0, 8));
        payment = paymentRepository.save(payment);

        PaymentResponseDTO response = new PaymentResponseDTO();
        response.setClientSecret("simulated_secret_" + payment.getTransactionId());
        response.setPaymentId(payment.getPaymentId());
        response.setStatus("PENDING");
        return response;
    }

    @Override
    public Payment confirmPayment(Long paymentId, String status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        
        payment.setStatus(status);
        if ("SUCCESS".equalsIgnoreCase(status)) {
            Booking booking = payment.getBooking();
            booking.setStatus("CONFIRMED");
            bookingRepository.save(booking);
            // Simulate Invoice Generation
            System.out.println("====== INVOICE GENERATED ======");
            System.out.println("Booking ID: " + booking.getBookingId());
            System.out.println("Amount Paid: $" + payment.getAmount());
            System.out.println("Method: " + payment.getMethod());
            System.out.println("===============================");
        }
        
        return paymentRepository.save(payment);
    }
}
