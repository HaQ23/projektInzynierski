package pl.reservations.core.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.reservations.core.user.model.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByActivationToken(UUID activationToken);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
