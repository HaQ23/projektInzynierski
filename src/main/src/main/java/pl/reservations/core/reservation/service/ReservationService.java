package pl.reservations.core.reservation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.reservations.core.employee.model.EmployeeOffer;
import pl.reservations.core.employee.dto.EmployeeScheduleDto;
import pl.reservations.core.employee.service.EmployeeScheduleService;
import pl.reservations.core.employee.repository.EmployeeOfferRepository;
import pl.reservations.core.reservation.assembler.ReservationAssembler;
import pl.reservations.core.reservation.assembler.ReservationDetailsAssembler;
import pl.reservations.core.reservation.dto.ReservationDetailsDto;
import pl.reservations.core.reservation.dto.ReservationDto;
import pl.reservations.core.reservation.model.Reservation;
import pl.reservations.core.reservation.repository.ReservationRepository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final EmployeeOfferRepository employeeOfferRepository;
    private final EmployeeScheduleService employeeScheduleService;


    @Autowired
    private ReservationDetailsAssembler reservationDetailsAssembler;
    public ReservationDto addReservation(ReservationDto reservationDto, UUID userId) {

        EmployeeOffer employeeOffer = employeeOfferRepository.findById(reservationDto.getEmployeeOfferId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid employee offer ID"));


        Reservation reservation = ReservationAssembler.toEntity(reservationDto, employeeOffer);
        reservation.setUserId(userId);
        reservation.setStatus("oczekujaca");

        reservationRepository.save(reservation);


        EmployeeScheduleDto employeeScheduleDto = new EmployeeScheduleDto();
        employeeScheduleDto.setEmployeeId(employeeOffer.getEmployee().getId());
        employeeScheduleDto.setDate(reservationDto.getReservationDate());
        employeeScheduleDto.setUnavailableFrom(reservationDto.getReservationTime());
        employeeScheduleDto.setTime(Integer.parseInt(employeeOffer.getTime()));

        employeeScheduleService.addEmployeeSchedule(employeeScheduleDto);

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
    public List<ReservationDto> getUpcomingReservations(UUID userId) {
        return reservationRepository.findByUserId(userId).stream()
                .filter(reservation ->
                        (reservation.getReservationDate().isAfter(LocalDate.now()) ||
                                (reservation.getReservationDate().isEqual(LocalDate.now()) &&
                                        LocalTime.parse(reservation.getReservationTime()).isAfter(LocalTime.now()))) &&
                                reservation.getStatus().equalsIgnoreCase("oczekujaca"))
                .map(ReservationAssembler::toDto)
                .collect(Collectors.toList());
    }

    public List<ReservationDto> getPastReservations(UUID userId) {
        return reservationRepository.findByUserId(userId).stream()
                .filter(reservation ->
                        reservation.getReservationDate().isBefore(LocalDate.now()) ||
                                (reservation.getReservationDate().isEqual(LocalDate.now()) &&
                                        LocalTime.parse(reservation.getReservationTime()).isBefore(LocalTime.now())) ||
                                !reservation.getStatus().equalsIgnoreCase("oczekujaca"))
                .map(ReservationAssembler::toDto)
                .collect(Collectors.toList());
    }
    public List<ReservationDetailsDto> getReservationDetailsForEmployee(Long employeeId, String startDate, String endDate) {
        LocalDate start = LocalDate.parse(startDate.trim());
        LocalDate end = LocalDate.parse(endDate.trim());

        List<Reservation> reservations = reservationRepository.findReservationsByEmployeeAndDateRange(employeeId, start, end);
        return reservations.stream()
                .map(reservationDetailsAssembler::toDto)
                .collect(Collectors.toList());
    }

    public List<ReservationDetailsDto> getAllReservationDetailsForEmployee(Long employeeId) {
        List<Reservation> reservations = reservationRepository.findReservationsByEmployeeId(employeeId);
        return reservations.stream()
                .map(reservationDetailsAssembler::toDto)
                .collect(Collectors.toList());
    }
    public void cancelReservationAsAdmin(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

        if (!reservation.getStatus().equalsIgnoreCase("oczekujaca")) {
            throw new IllegalStateException("Nie można anulować zakończonej lub anulowanej rezerwacji");
        }

        reservation.setStatus("anulowana");
        reservationRepository.save(reservation);
    }
    public void deleteReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

        reservationRepository.delete(reservation);
    }
}
