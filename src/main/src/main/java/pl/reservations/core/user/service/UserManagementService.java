package pl.reservations.core.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.reservations.core.reservation.repository.ReservationRepository;
import pl.reservations.core.user.dto.UserDetailsDto;
import pl.reservations.core.user.model.User;
import pl.reservations.core.user.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserManagementService {

    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;

    public List<UserDetailsDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> {
                    UserDetailsDto dto = new UserDetailsDto();
                    dto.setId(user.getId());
                    dto.setUsername(user.getUsername());
                    dto.setEmail(user.getEmail());
                    dto.setEnabled(user.isEnabled());
                    dto.setFirstname(user.getFirstname());
                    dto.setLastname(user.getLastname());
                    dto.setPhoneNumber(user.getPhoneNumber());
                    dto.setAddress(user.getAddress());
                    int reservationCount = reservationRepository.countReservationsByUserId(user.getId());
                    dto.setReservationCount(reservationCount);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public void blockUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setEnabled(false);
        userRepository.save(user);
    }

    public void unblockUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
    }
}
