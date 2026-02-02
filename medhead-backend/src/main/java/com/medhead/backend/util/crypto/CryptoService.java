package com.medhead.backend.util.crypto;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

public class CryptoService {

    private static final String AES = "AES";
    private static final String AES_GCM = "AES/GCM/NoPadding";
    private static final int IV_LENGTH_BYTES = 12;   // recommandé GCM
    private static final int TAG_LENGTH_BITS = 128;  // 16 bytes

    private final SecretKey key;
    private final SecureRandom secureRandom = new SecureRandom();

    public CryptoService(String base64Key) {
        if (base64Key == null || base64Key.isBlank()) {
            throw new IllegalArgumentException(
                    "medhead.crypto.key est vide. Vérifie MEDHEAD_CRYPTO_KEY dans .env (backend)."
            );
        }

        byte[] keyBytes = Base64.getDecoder().decode(base64Key);

        // 32 bytes = AES-256
        if (keyBytes.length != 32) {
            throw new IllegalArgumentException(
                    "medhead.crypto.key doit être une clé Base64 de 32 bytes (256 bits)."
            );
        }

        this.key = new SecretKeySpec(keyBytes, AES);
    }

    public String encrypt(String plainText) {
        if (plainText == null || plainText.isBlank()) return plainText;

        try {
            byte[] iv = new byte[IV_LENGTH_BYTES];
            secureRandom.nextBytes(iv);

            Cipher cipher = Cipher.getInstance(AES_GCM);
            cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(TAG_LENGTH_BITS, iv));

            byte[] ciphertext = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));

            // format stable: base64(iv):base64(ciphertext)
            return Base64.getEncoder().encodeToString(iv)
                    + ":"
                    + Base64.getEncoder().encodeToString(ciphertext);

        } catch (Exception e) {
            throw new IllegalStateException("Erreur chiffrement AES-GCM", e);
        }
    }

    public String decrypt(String encrypted) {
        if (encrypted == null || encrypted.isBlank()) return encrypted;

        try {
            String[] parts = encrypted.split(":");
            if (parts.length != 2) {
                throw new IllegalArgumentException("Format chiffré invalide (attendu iv:ciphertext)");
            }

            byte[] iv = Base64.getDecoder().decode(parts[0]);
            byte[] ciphertext = Base64.getDecoder().decode(parts[1]);

            Cipher cipher = Cipher.getInstance(AES_GCM);
            cipher.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(TAG_LENGTH_BITS, iv));

            byte[] plain = cipher.doFinal(ciphertext);
            return new String(plain, StandardCharsets.UTF_8);

        } catch (Exception e) {
            throw new IllegalStateException("Erreur déchiffrement AES-GCM", e);
        }
    }
}
