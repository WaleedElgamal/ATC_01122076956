package com.app.event_booking.dto;

import com.app.event_booking.model.Event;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EventStatus {
    private Event event;
    private boolean isBooked;
}
