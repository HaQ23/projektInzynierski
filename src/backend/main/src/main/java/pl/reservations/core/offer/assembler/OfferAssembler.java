package pl.reservations.core.offer.assembler;

import org.springframework.stereotype.Component;
import pl.reservations.core.offer.dto.OfferDto;
import pl.reservations.core.offer.model.Offer;

@Component
public class OfferAssembler {


    public OfferDto assemble(Offer offer) {
        return OfferDto
                .builder()
                .id(offer.getId())
                .title(offer.getTitle())
                .description(offer.getDescription())
                .build();
    }
}
