package com.app.event_booking.controller;

import com.app.event_booking.model.Booking;
import com.app.event_booking.model.Event;
import com.app.event_booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/{eventId}/{userId}")
    public ResponseEntity<?> bookEvent(@PathVariable Long eventId,
                                       @PathVariable Long userId) {
        try {
            Booking booking = bookingService.bookEvent(userId, eventId);
            return ResponseEntity.ok(booking);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/my-events/{userId}")
    public ResponseEntity<List<Event>> getMyBookings(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }
}

