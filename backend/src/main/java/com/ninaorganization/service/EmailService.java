package com.ninaorganization.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    private static final String RESEND_API = "https://api.resend.com/emails";

    private final RestTemplate restTemplate;

    @Value("${resend.api-key:}")
    private String resendApiKey;

    @Value("${resend.from-email}")
    private String fromEmail;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public void sendEmail(String to, String subject, String htmlBody) {
        if (resendApiKey == null || resendApiKey.isBlank()) {
            log.info("[Email stub] To: {} | Subject: {}", to, subject);
            return;
        }
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(resendApiKey);

            Map<String, Object> body = Map.of(
                    "from", fromEmail,
                    "to", List.of(to),
                    "subject", subject,
                    "html", htmlBody
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.exchange(RESEND_API, HttpMethod.POST, request, String.class);
            log.info("Resend email sent to {} status={}", to, response.getStatusCode());
        } catch (Exception e) {
            log.error("Failed to send email via Resend to {}", to, e);
        }
    }

    public void sendWelcome(String to, String name) {
        sendEmail(to, "Welcome to Nina Organization",
                "<h1>Welcome " + escape(name) + "!</h1><p>Start exploring jobs and opportunities at Nina Organization.</p>");
    }

    public void sendVerification(String to, String token) {
        sendEmail(to, "Verify your email",
                "<p>Click to verify: <a href=\"" + frontendUrl + "/verify?token=" + token + "\">Verify Email</a></p>");
    }

    public void sendPasswordReset(String to, String token) {
        sendEmail(to, "Reset your password",
                "<p>Reset link: <a href=\"" + frontendUrl + "/reset-password?token=" + token + "\">Reset Password</a></p>");
    }

    public void sendApplicationUpdate(String to, String jobTitle, String status) {
        sendEmail(to, "Application Update - " + escape(jobTitle),
                "<p>Your application status is now: <strong>" + escape(status) + "</strong></p>");
    }

    private static String escape(String s) {
        if (s == null) return "";
        return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }
}
