package com.app.event_booking.controller;

import com.app.event_booking.dto.AuthRequest;
import com.app.event_booking.dto.AuthResponse;
import com.app.event_booking.dto.RegisterRequest;
import com.app.event_booking.model.Role;
import com.app.event_booking.model.User;
import com.app.event_booking.repository.UserRepository;
import com.app.event_booking.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        User user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(registerRequest.getRole() != null ? registerRequest.getRole() : Role.USER)
                .build();

        userRepository.save(user);

        UserDetails userDetails = userRepository.findByEmail(registerRequest.getEmail())
                .map(u -> new org.springframework.security.core.userdetails.User(
                        u.getEmail(), u.getPassword(),
                        Collections.singleton(new SimpleGrantedAuthority("ROLE_" + u.getRole()))
                ))
                .orElseThrow();

        String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

        UserDetails userDetails = userRepository.findByEmail(authRequest.getEmail())
                .map(u -> new org.springframework.security.core.userdetails.User(
                        u.getEmail(), u.getPassword(),
                        Collections.singleton(new SimpleGrantedAuthority("ROLE_" + u.getRole()))
                ))
                .orElseThrow();

        String token = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
