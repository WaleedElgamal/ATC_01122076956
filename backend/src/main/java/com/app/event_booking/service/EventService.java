package com.app.event_booking.service;

import com.app.event_booking.dto.EventStatus;
import com.app.event_booking.model.Event;
import com.app.event_booking.model.User;
import com.app.event_booking.repository.BookingRepository;
import com.app.event_booking.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;

    public Page<EventStatus> getAllEvents(int page, int size, User user) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").ascending());
        Page<Event> eventsPage = eventRepository.findAll(pageable);

        Set<Long> bookedEventIds = bookingRepository.findByUser(user).stream()
                .map(booking -> booking.getEvent().getId())
                .collect(Collectors.toSet());

        // Map Event to EventWithBookingStatusDTO
        return eventsPage.map(event ->
                new EventStatus(event, bookedEventIds.contains(event.getId()))
        );
    }

    public Page<EventStatus> getEventsByCategory(String category, int page, int size, User user) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Event> eventsPage = eventRepository.findByCategory(category, pageable);

        Set<Long> bookedEventIds = bookingRepository.findByUser(user).stream()
                .map(booking -> booking.getEvent().getId())
                .collect(Collectors.toSet());

        return eventsPage.map(event -> new EventStatus(event, bookedEventIds.contains(event.getId())));
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setName(updatedEvent.getName());
        event.setDescription(updatedEvent.getDescription());
        event.setCategory(updatedEvent.getCategory());
        event.setVenue(updatedEvent.getVenue());
        event.setDate(updatedEvent.getDate());
        event.setPrice(updatedEvent.getPrice());
        event.setImageUrl(updatedEvent.getImageUrl());
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        eventRepository.deleteById(id);
    }
}
