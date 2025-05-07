package com.app.event_booking.service;

import com.app.event_booking.model.Event;
import com.app.event_booking.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    public Page<Event> getAllEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").ascending());
        return eventRepository.findAll(pageable);
    }

    public Page<Event> getEventsByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return eventRepository.findByCategory(category, pageable);
    }

    public Page<Event> getEventsByTag(String tag, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return eventRepository.findByTagsContaining(tag, pageable);
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
        event.setTags(updatedEvent.getTags());
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        eventRepository.deleteById(id);
    }
}
