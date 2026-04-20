package com.vehiclerental.vehiclerental.repository;

import com.vehiclerental.vehiclerental.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
