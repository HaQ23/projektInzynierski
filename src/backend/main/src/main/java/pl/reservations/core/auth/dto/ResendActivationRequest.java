package pl.reservations.core.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResendActivationRequest {
    private String email;
}
