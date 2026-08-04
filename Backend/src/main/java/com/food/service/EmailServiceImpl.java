package com.food.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private static final String FROM_NAME = "Beyond Waste";

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendOtp(String toEmail, String otp, String purposeLabel) {

        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, FROM_NAME);   // shows as "Beyond Waste <fromEmail>"
            helper.setTo(toEmail);
            helper.setSubject("Beyond Waste – Your Verification Code");
            helper.setText(buildHtmlBody(otp, purposeLabel), true);

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP email: " + e.getMessage(), e);
        }
    }

    private String buildHtmlBody(String otp, String purposeLabel) {

        return """
                <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">

                    <h2 style="color: #16a34a; margin-bottom: 4px;">Beyond Waste</h2>
                    <p style="color: #6b7280; margin-top: 0; font-size: 14px;">Reducing food waste, building community.</p>

                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

                    <p style="font-size: 15px; color: #111827;">
                        Use the code below to %s. This code is valid for
                        <strong>10 minutes</strong>.
                    </p>

                    <div style="text-align: center; margin: 28px 0;">
                        <span style="display: inline-block; font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #16a34a; background: #f0fdf4; padding: 14px 24px; border-radius: 8px;">
                            %s
                        </span>
                    </div>

                    <p style="font-size: 13px; color: #6b7280;">
                        If you didn't request this code, you can safely ignore this email —
                        no changes will be made to your account.
                    </p>

                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

                    <p style="font-size: 12px; color: #9ca3af; text-align: center;">
                        © Beyond Waste. Please do not reply to this automated email.
                    </p>

                </div>
                """.formatted(purposeLabel, otp);
    }
}