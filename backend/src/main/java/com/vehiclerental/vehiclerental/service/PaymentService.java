package com.vehiclerental.vehiclerental.service;

import com.vehiclerental.vehiclerental.dto.PaymentRequestDTO;
import com.vehiclerental.vehiclerental.dto.PaymentResponseDTO;
import com.vehiclerental.vehiclerental.entity.Payment;

public interface PaymentService {
    PaymentResponseDTO createPaymentIntent(PaymentRequestDTO requestDTO) throws Exception;
    Payment confirmPayment(Long paymentId, String status);
}
