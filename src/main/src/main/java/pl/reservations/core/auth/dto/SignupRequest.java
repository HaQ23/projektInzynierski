package pl.reservations.core.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String username;
    private String password;
    private String email;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String address;
}
