package com.medhead.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final Key key;
    private final long expirationMillis;

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration-minutes}") long expirationMinutes
    ) {
        // IMPORTANT : le secret doit faire au moins 32 caractères
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMillis = expirationMinutes * 60_000;
    }

    // =========================
    // Générer un token JWT
    // =========================
    public String generateToken(String email, String role) {

        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMillis);

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // =========================
    // Extraire l'email (subject)
    // =========================
    public String extractEmail(String token) {
        Claims claims = parseToken(token).getBody();
        return claims.getSubject();
    }

    // =========================
    // Extraire le role
    // =========================
    public String extractRole(String token) {
        Claims claims = parseToken(token).getBody();
        Object role = claims.get("role");
        return role == null ? null : role.toString();
    }

    // =========================
    // Parser / valider le token
    // =========================
    private Jws<Claims> parseToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }
}
