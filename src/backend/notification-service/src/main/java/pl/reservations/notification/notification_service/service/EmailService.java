package pl.reservations.notification.notification_service.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // Uniwersalna metoda wysyłki wiadomości
    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("infoquickcut@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    // Wiadomość o nowej rezerwacji
    public void sendNewReservationEmail(String to, String firstName, String lastName, String serviceName, String date, String time) {
        String subject = "Potwierdzenie rezerwacji";
        String text = "Cześć " + firstName + " " + lastName + ",\n\n" +
                "Twoja rezerwacja została pomyślnie dodana:\n" +
                "Usługa: " + serviceName + "\n" +
                "Data: " + date + "\n" +
                "Godzina: " + time + "\n\n" +
                "Dziękujemy za skorzystanie z naszych usług!";
        sendEmail(to, subject, text);
    }

    // Wiadomość o anulowaniu rezerwacji
    public void sendCancellationEmail(String to, String firstName, String lastName, String serviceName, String date, String time) {
        String subject = "Anulowanie rezerwacji";
        String text = "Cześć " + firstName + " " + lastName + ",\n\n" +
                "Twoja rezerwacja została anulowana:\n" +
                "Usługa: " + serviceName + "\n" +
                "Data: " + date + "\n" +
                "Godzina: " + time + "\n\n" +
                "Jeśli to pomyłka, prosimy o kontakt z naszym biurem.";
        sendEmail(to, subject, text);
    }

    public void sendReminderEmail(String to, String firstName, String lastName, String serviceName, String date, String time) {
        String subject = "Przypomnienie o rezerwacji";
        String text = "Cześć " + firstName + " " + lastName + ",\n\n" +
                "Przypominamy o Twojej rezerwacji:\n" +
                "Usługa: " + serviceName + "\n" +
                "Data: " + date + "\n" +
                "Godzina: " + time + "\n\n" +
                "Do zobaczenia!";
        sendEmail(to, subject, text);
    }
}
