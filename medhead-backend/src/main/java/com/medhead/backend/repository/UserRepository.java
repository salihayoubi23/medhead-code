package com.medhead.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.medhead.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailHash(String emailHash);

    boolean existsByEmailHash(String emailHash);
}
