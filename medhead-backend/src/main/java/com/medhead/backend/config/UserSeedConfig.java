package com.medhead.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.medhead.backend.model.User;
import com.medhead.backend.repository.UserRepository;

@Configuration
public class UserSeedConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CommandLineRunner seedAdmin(UserRepository userRepository,
                                       BCryptPasswordEncoder encoder) {
        return args -> {

            String email = "admin@medhead.local";

            if (!userRepository.existsByEmail(email)) {

                User admin = new User(
                        email,
                        encoder.encode("Admin123!"),
                        "ROLE_ADMIN"
                );

                userRepository.save(admin);
            }
        };
    }
}
