package pl.reservations.core.offer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.reservations.core.offer.assembler.OfferAssembler;
import pl.reservations.core.offer.dto.OfferDto;
import pl.reservations.core.offer.model.Offer;
import pl.reservations.core.offer.repository.OfferRepository;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
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

    public List<OfferDto> getAllOffers() {
        return offerRepository.findAll().stream()
                .map(offerAssembler::assemble)
                .collect(Collectors.toList());
    }

    public OfferDto updateOffer(Long id, OfferDto offerDto) {
        Offer offer = offerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Offer not found"));
        offer.setTitle(offerDto.getTitle());
        offer.setDescription(offerDto.getDescription());
        offerRepository.save(offer);
        return offerAssembler.assemble(offer);
    }

    public void deleteOffer(Long id) {
        offerRepository.deleteById(id);
    }
}
