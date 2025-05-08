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
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/{eventId}")
    public ResponseEntity<?> bookEvent(@PathVariable Long eventId,
                                       @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Booking booking = bookingService.bookEvent(userDetails.getUsername(), eventId);
            return ResponseEntity.ok(booking);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/my-events")
    public ResponseEntity<List<Event>> getMyBookings(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.getUserBookings(userDetails.getUsername()));
    }
}

