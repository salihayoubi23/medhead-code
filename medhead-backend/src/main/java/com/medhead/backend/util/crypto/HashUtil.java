package com.medhead.backend.util.crypto;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class HashUtil {

    private HashUtil() {}

    public static String sha256HexLowerTrim(String input) {
        if (input == null) return null;
        String normalized = input.trim().toLowerCase();

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(normalized.getBytes(StandardCharsets.UTF_8));
            return toHex(hash);
        } catch (Exception e) {
            throw new IllegalStateException("Erreur SHA-256", e);
        }
    }

    private static String toHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) sb.append(String.format("%02x", b));
        return sb.toString();
    }
}

