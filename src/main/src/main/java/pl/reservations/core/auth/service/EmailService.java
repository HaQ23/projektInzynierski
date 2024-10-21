package pl.reservations.core.auth.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendActivationEmail(String to, String activationLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("infoquickcut@gmail.com");
            message.setTo(to);
            message.setSubject("Account Activation");
            message.setText("Click the link to activate your account: " + activationLink);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Error sending activation email: " + e.getMessage());
        }
    }
}
