package pl.reservations.core.offer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.reservations.core.offer.model.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {
}
