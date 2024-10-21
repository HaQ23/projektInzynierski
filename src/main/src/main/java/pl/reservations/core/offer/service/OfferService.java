package pl.reservations.core.offer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.reservations.core.offer.assembler.OfferAssembler;
import pl.reservations.core.offer.dto.OfferDto;
import pl.reservations.core.offer.model.Offer;
import pl.reservations.core.offer.repository.OfferRepository;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;
    private final OfferAssembler offerAssembler;


    public OfferDto addOffer(OfferDto offerDto) {
        Offer offer = new Offer();
        offer.setTitle(offerDto.getTitle());
        offer.setDescription(offerDto.getDescription());
        offerRepository.save(offer);
        return offerAssembler.assemble(offer);
    }
}
