package pl.reservations.core.offer.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.reservations.core.offer.dto.OfferDto;
import pl.reservations.core.offer.service.OfferService;

@RestController
@RequestMapping("/api/offer/")
@RequiredArgsConstructor
public class OfferController {

    private final OfferService offerService;

    @PostMapping
    public OfferDto addOffer(@RequestBody OfferDto offerDto) {
        return offerService.addOffer(offerDto);
    }
}
