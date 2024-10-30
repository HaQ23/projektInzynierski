package pl.reservations.core.reservation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.reservations.core.employee.model.EmployeeOffer;
import pl.reservations.core.employee.repository.EmployeeOfferRepository;
import pl.reservations.core.reservation.assembler.ReservationAssembler;
import pl.reservations.core.reservation.dto.ReservationDto;
import pl.reservations.core.reservation.model.Reservation;
import pl.reservations.core.reservation.repository.ReservationRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final EmployeeOfferRepository employeeOfferRepository;

    public ReservationDto addReservation(ReservationDto reservationDto, UUID userId) {
        EmployeeOffer employeeOffer = employeeOfferRepository.findById(reservationDto.getEmployeeOfferId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid employee offer ID"));

        Reservation reservation = ReservationAssembler.toEntity(reservationDto);
        reservation.setEmployeeOffer(employeeOffer);
        reservation.setUserId(userId);
        reservation.setStatus("oczekujaca");

        reservationRepository.save(reservation);
        return ReservationAssembler.toDto(reservation);
    }

    public ReservationDto updateReservation(Long id, ReservationDto reservationDto, UUID userId) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

        if (!reservation.getUserId().equals(userId)) {
            throw new SecurityException("Unauthorized to update this reservation");
        }

        reservation.setReservationDate(reservationDto.getReservationDate());
        reservation.setReservationTime(reservationDto.getReservationTime());
        reservation.setStatus(reservationDto.getStatus());

        reservationRepository.save(reservation);
        return ReservationAssembler.toDto(reservation);
    }

    public void cancelReservation(Long id, UUID userId) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

        if (!reservation.getUserId().equals(userId)) {
            throw new SecurityException("Unauthorized to cancel this reservation");
        }

        reservation.setStatus("anulowana");
        reservationRepository.save(reservation);
    }

    public List<ReservationDto> getAllReservationsByUserId(UUID userId) {
        return reservationRepository.findByUserId(userId).stream()
                .map(ReservationAssembler::toDto)
                .collect(Collectors.toList());
    }

    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(ReservationAssembler::toDto)
                .collect(Collectors.toList());
    }
}
