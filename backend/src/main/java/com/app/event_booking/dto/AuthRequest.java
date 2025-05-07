package com.app.event_booking.dto;

import lombok.Data;


@Data
public class AuthRequest {
    private String email;
    private String password;
}