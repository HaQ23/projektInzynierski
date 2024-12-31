package pl.reservations.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String address;
    private String role;
}
