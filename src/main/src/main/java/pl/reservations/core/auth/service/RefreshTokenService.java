package pl.reservations.core.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.reservations.core.auth.model.RefreshToken;
import pl.reservations.core.auth.repository.RefreshTokenRepository;
import pl.reservations.core.user.model.User;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    private final long refreshTokenDurationMs = 7 * 24 * 60 * 60 * 1000; // 7 dni

    public RefreshToken createOrGetRefreshToken(User user) {
        Optional<RefreshToken> existingRefreshToken = refreshTokenRepository.findByUser(user);

        if (existingRefreshToken.isPresent()) {
            return existingRefreshToken.get();
        }

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());
        return refreshTokenRepository.save(refreshToken);
    }


    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public boolean isValid(RefreshToken token) {
        return token.getExpiryDate().isAfter(Instant.now());
    }

}
