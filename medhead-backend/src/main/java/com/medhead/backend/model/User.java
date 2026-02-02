package com.medhead.backend.model;

import com.medhead.backend.util.crypto.EncryptedStringConverter;
import com.medhead.backend.util.crypto.HashUtil;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Email chiffré en base (data at rest)
    @Convert(converter = EncryptedStringConverter.class)
    @Column(nullable = false, unique = true, length = 512)
    private String email;

    // Email hashé (SHA-256) pour retrouver l'utilisateur au login
    @Column(name = "email_hash", nullable = false, unique = true, length = 64)
    private String emailHash;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String role;

    public User() {}

    public User(String email, String passwordHash, String role) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    @PrePersist
    @PreUpdate
    private void computeEmailHash() {
        this.emailHash = HashUtil.sha256HexLowerTrim(this.email);
    }

    public Long getId() { return id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getEmailHash() { return emailHash; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
