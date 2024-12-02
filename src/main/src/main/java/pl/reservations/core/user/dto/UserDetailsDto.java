package pl.reservations.core.user.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Data
public class UserDetailsDto {
    private UUID id;
    private String username;
    private String email;
    private boolean enabled;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String address;
    private int reservationCount;
}
