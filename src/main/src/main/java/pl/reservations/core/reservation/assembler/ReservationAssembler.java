package pl.reservations.core.reservation.assembler;

import pl.reservations.core.reservation.dto.ReservationDto;
import pl.reservations.core.reservation.model.Reservation;

public class ReservationAssembler {

    public static Reservation toEntity(ReservationDto reservationDto) {
        Reservation reservation = new Reservation();
        reservation.setId(reservationDto.getId());
        reservation.setReservationDate(reservationDto.getReservationDate());
        reservation.setReservationTime(reservationDto.getReservationTime());
        reservation.setUserId(reservationDto.getUserId());
        reservation.setStatus(reservationDto.getStatus());
        return reservation;
    }

    public static ReservationDto toDto(Reservation reservation) {
        return new ReservationDto(
                reservation.getId(),
                reservation.getReservationDate(),
                reservation.getReservationTime(),
                reservation.getEmployeeOffer().getId(),
                reservation.getUserId(),
                Integer.parseInt(reservation.getEmployeeOffer().getTime()),
                reservation.getStatus()
        );
    }
}
