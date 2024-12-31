package pl.reservations.core.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.reservations.core.user.model.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByActivationToken(UUID activationToken);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
    Optional<User> findById(UUID id);
    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.userId = :userId")
    int countReservationsByUserId(@Param("userId") UUID userId);

}
