package com.medhead.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SecurityAuthTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void login_shouldReturnToken() throws Exception {
        String body = """
                {
                  "email": "admin@medhead.local",
                  "password": "Admin123!"
                }
                """;

        mockMvc.perform(
                post("/auth/login")
                        .contentType("application/json")
                        .content(body)
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void recommendations_withoutToken_shouldReturn401() throws Exception {
        String body = """
                {
                  "speciality": "Cardiologie",
                  "originZone": "LONDON_CENTRAL"
                }
                """;

        mockMvc.perform(
                post("/recommendations")
                        .contentType("application/json")
                        .content(body)
        )
                .andExpect(status().isUnauthorized());
    }
}
