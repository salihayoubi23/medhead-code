package com.medhead.backend.util.crypto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CryptoKeyHolder {

    private static String base64Key;

    public CryptoKeyHolder(@Value("${medhead.crypto.key}") String key) {
        base64Key = key;
    }

    public static String getBase64Key() {
        return base64Key;
    }
}
