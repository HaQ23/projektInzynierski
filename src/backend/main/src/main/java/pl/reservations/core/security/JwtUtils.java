package pl.reservations.core.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import pl.reservations.core.user.model.User;

import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationMs}")
    private long jwtExpirationMs;


    public String generateJwtToken(Authentication authentication) {
        User userPrincipal = (User) authentication.getPrincipal();


        byte[] secretKey = Base64.getDecoder().decode(jwtSecret);

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }


    public String getUsernameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(Base64.getDecoder().decode(jwtSecret))
                .parseClaimsJws(token).getBody().getSubject();
    }


    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().setSigningKey(Base64.getDecoder().decode(jwtSecret))
                    .parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.SignatureException e) {
            System.out.println("Invalid JWT signature: " + e.getMessage());
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            System.out.println("Invalid JWT token: " + e.getMessage());
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            System.out.println("JWT token is expired: " + e.getMessage());
        } catch (io.jsonwebtoken.UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty: " + e.getMessage());
        }
        return false;
    }

}
