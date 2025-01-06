package pl.reservations.core.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import pl.reservations.core.user.model.User;
import pl.reservations.core.user.repository.UserRepository;

@Service
public class RegistrationService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    public void registerUser(User user) {
        userRepository.save(user);
        sendActivationEmail(user);
    }

    private void sendActivationEmail(User user) {
        String activationLink = "https://quickcut.onrender.com/api/auth/activate?token=" + user.getActivationToken();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Account Activation");
        message.setText("To activate your account, please click the following link: " + activationLink);
        mailSender.send(message);
    }
}
