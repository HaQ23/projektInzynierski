package pl.reservations.core.reservation.assembler;

import pl.reservations.core.employee.model.EmployeeOffer;
import pl.reservations.core.reservation.dto.ReservationDto;
import pl.reservations.core.reservation.model.Reservation;

public class ReservationAssembler {

    public static Reservation toEntity(ReservationDto reservationDto, EmployeeOffer employeeOffer) {
        Reservation reservation = new Reservation();
        reservation.setId(reservationDto.getId());
        reservation.setReservationDate(reservationDto.getReservationDate());
        reservation.setReservationTime(reservationDto.getReservationTime());
        reservation.setUserId(reservationDto.getUserId());
        reservation.setStatus(reservationDto.getStatus());
        reservation.setEmployeeOffer(employeeOffer);
        return reservation;
    }

    public static ReservationDto toDto(Reservation reservation) {
        return new ReservationDto(
                reservation.getId(),
                reservation.getReservationDate(),
                reservation.getReservationTime(),
                reservation.getEmployeeOffer().getEmployee().getFirstName(),
                reservation.getEmployeeOffer().getEmployee().getLastName(),
                reservation.getEmployeeOffer().getOffer().getTitle(),
                reservation.getEmployeeOffer().getPrice(),
                reservation.getUserId(),
                reservation.getStatus(),
                reservation.getEmployeeOffer().getId()
        );
    }


}
