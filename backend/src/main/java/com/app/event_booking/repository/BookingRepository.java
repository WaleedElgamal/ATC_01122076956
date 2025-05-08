package com.app.event_booking.repository;

import com.app.event_booking.model.Booking;
import com.app.event_booking.model.Event;
import com.app.event_booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    Optional<Booking> findByUserAndEvent(User user, Event event);
}
