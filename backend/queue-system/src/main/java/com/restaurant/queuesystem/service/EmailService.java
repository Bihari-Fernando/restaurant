package com.restaurant.queuesystem.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            System.out.println("Email sent to: " + to);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    // Table ready notification
    public void sendTableReadyEmail(String to, String customerName, int tableNumber) {
        String subject = "🍽️ Your Table is Ready!";
        String body = "Dear " + customerName + ",\n\n"
                + "Great news! Your table (Table " + tableNumber + ") is now ready.\n"
                + "Please proceed to the reception.\n\n"
                + "Thank you for your patience!\n\n"
                + "Best regards,\n"
                + "Restaurant Queue System";
        sendEmail(to, subject, body);
    }

    // Booking confirmation
    public void sendBookingConfirmationEmail(String to, String customerName, int tableNumber) {
        String subject = "✅ Booking Confirmed!";
        String body = "Dear " + customerName + ",\n\n"
                + "Your booking has been confirmed!\n"
                + "Table Number: " + tableNumber + "\n\n"
                + "We look forward to serving you.\n\n"
                + "Best regards,\n"
                + "Restaurant Queue System";
        sendEmail(to, subject, body);
    }

    // Order served notification
    public void sendOrderServedEmail(String to, String customerName, String itemName) {
        String subject = "🍗 Your Order is Ready!";
        String body = "Dear " + customerName + ",\n\n"
                + "Your order '" + itemName + "' has been served!\n"
                + "Enjoy your meal!\n\n"
                + "Best regards,\n"
                + "Restaurant Queue System";
        sendEmail(to, subject, body);
    }
}