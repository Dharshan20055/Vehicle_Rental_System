package com.vehiclerental.vehiclerental.controller;

import com.vehiclerental.vehiclerental.dto.SignupRequest;
import com.vehiclerental.vehiclerental.entity.Role;
import com.vehiclerental.vehiclerental.entity.User;
import com.vehiclerental.vehiclerental.repository.UserRepository;
import com.vehiclerental.vehiclerental.serviceImpl.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Optional<User> user = userRepository.findById(userDetails.getId());

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody User updatedUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Optional<User> userOpt = userRepository.findById(userDetails.getId());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if(updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
            if(updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(encoder.encode(updatedUser.getPassword()));
            }
            userRepository.save(user);
            return ResponseEntity.ok("Profile updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/staff")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createStaff(@RequestBody SignupRequest staffRequest) {
        if (userRepository.existsByUsername(staffRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(staffRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User staff = new User(
                staffRequest.getUsername(),
                staffRequest.getEmail(),
                encoder.encode(staffRequest.getPassword()),
                Role.STAFF
        );

        userRepository.save(staff);
        return ResponseEntity.ok("Staff member created successfully!");
    }
}
