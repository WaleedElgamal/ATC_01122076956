package com.app.event_booking.service;

import com.app.event_booking.model.Booking;
import com.app.event_booking.model.Event;
import com.app.event_booking.model.User;
import com.app.event_booking.repository.BookingRepository;
import com.app.event_booking.repository.EventRepository;
import com.app.event_booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public Booking bookEvent(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (bookingRepository.findByUserAndEvent(user, event).isPresent()) {
            throw new IllegalStateException("Event already booked by user");
        }

        Booking booking = Booking.builder()
                .user(user)
                .event(event)
                .build();

        return bookingRepository.save(booking);
    }

    public List<Event> getUserBookings(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return bookingRepository.findByUser(user)
                .stream()
                .map(Booking::getEvent)
                .collect(Collectors.toList());
    }
}
