package com.vehiclerental.vehiclerental.controller;

import com.vehiclerental.vehiclerental.dto.PaymentRequestDTO;
import com.vehiclerental.vehiclerental.dto.PaymentResponseDTO;
import com.vehiclerental.vehiclerental.entity.Payment;
import com.vehiclerental.vehiclerental.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-intent")
    public ResponseEntity<PaymentResponseDTO> createPaymentIntent(@RequestBody PaymentRequestDTO requestDTO) {
        try {
            PaymentResponseDTO response = paymentService.createPaymentIntent(requestDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/confirm/{paymentId}")
    public ResponseEntity<Payment> confirmPayment(@PathVariable Long paymentId, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        Payment payment = paymentService.confirmPayment(paymentId, status);
        return ResponseEntity.ok(payment);
    }
}
