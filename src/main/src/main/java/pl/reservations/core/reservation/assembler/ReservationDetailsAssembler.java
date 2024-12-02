package pl.reservations.core.reservation.assembler;

import org.springframework.stereotype.Component;
import pl.reservations.core.reservation.dto.ReservationDetailsDto;
import pl.reservations.core.reservation.model.Reservation;
import pl.reservations.core.user.model.User;
import pl.reservations.core.user.repository.UserRepository;

@Component
public class ReservationDetailsAssembler {

    private final UserRepository userRepository;

    public ReservationDetailsAssembler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ReservationDetailsDto toDto(Reservation reservation) {
        ReservationDetailsDto dto = new ReservationDetailsDto();

        dto.setId(reservation.getId());
        dto.setReservationDate(reservation.getReservationDate());
        dto.setReservationTime(reservation.getReservationTime());
        dto.setOfferName(reservation.getEmployeeOffer().getOffer().getTitle());
        dto.setPrice(reservation.getEmployeeOffer().getPrice());
        dto.setStatus(reservation.getStatus());
        dto.setEmployeeOfferId(reservation.getEmployeeOffer().getId());
        dto.setEmployeeId(reservation.getEmployeeOffer().getEmployee().getId());
        dto.setEmployeeFirstName(reservation.getEmployeeOffer().getEmployee().getFirstName());
        dto.setEmployeeLastName(reservation.getEmployeeOffer().getEmployee().getLastName());
        dto.setDuration(Integer.parseInt(reservation.getEmployeeOffer().getTime()));
        dto.setUserId(reservation.getUserId().toString());
        dto.setServiceId(reservation.getEmployeeOffer().getOffer().getId());

        User user = userRepository.findById(reservation.getUserId())
                .orElse(null);

        if (user != null) {
            dto.setUserFirstName(user.getFirstname());
            dto.setUserLastName(user.getLastname());
        }

        return dto;
    }
}
