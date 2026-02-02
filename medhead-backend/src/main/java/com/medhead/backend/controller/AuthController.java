package com.medhead.backend.controller;

import com.medhead.backend.dto.LoginRequest;
import com.medhead.backend.dto.LoginResponse;
import com.medhead.backend.model.User;
import com.medhead.backend.repository.UserRepository;
import com.medhead.backend.service.JwtService;
import com.medhead.backend.util.crypto.HashUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository,
                          BCryptPasswordEncoder passwordEncoder,
                          JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        String emailHash = HashUtil.sha256HexLowerTrim(request.getEmail());
        User user = userRepository.findByEmailHash(emailHash).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean ok = passwordEncoder.matches(request.getPassword(), user.getPasswordHash());

        if (!ok) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // ici user.getEmail() renvoie l'email en clair (décrypté par JPA)
        String token = jwtService.generateToken(user.getEmail(), user.getRole());

        return ResponseEntity.ok(new LoginResponse(token));
    }
}
