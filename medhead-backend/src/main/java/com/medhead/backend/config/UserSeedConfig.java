package com.medhead.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.medhead.backend.model.User;
import com.medhead.backend.repository.UserRepository;
import com.medhead.backend.util.crypto.HashUtil;

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

            String emailHash = HashUtil.sha256HexLowerTrim(email);

            if (!userRepository.existsByEmailHash(emailHash)) {

                User admin = new User(
                        email, // sera chiffré automatiquement par JPA
                        encoder.encode("Admin123!"),
                        "ROLE_ADMIN"
                );

                userRepository.save(admin);
            }
        };
    }
}
