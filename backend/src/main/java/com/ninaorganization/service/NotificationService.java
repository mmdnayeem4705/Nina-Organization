package com.ninaorganization.service;

import com.ninaorganization.entity.Notification;
import com.ninaorganization.entity.User;
import com.ninaorganization.repository.NotificationRepository;
import com.ninaorganization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public Notification create(Long userId, String title, String message, String type) {
        User user = userRepository.findById(userId).orElseThrow();
        Notification n = Notification.builder()
                .user(user).title(title).message(message).type(type).build();
        n = notificationRepository.save(n);
        messagingTemplate.convertAndSendToUser(
                user.getEmail(), "/queue/notifications", n);
        messagingTemplate.convertAndSend("/topic/notifications/" + userId, n);
        return n;
    }

    public Page<Notification> getUserNotifications(Long userId, Pageable pageable) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    }

    @Transactional
    public void markRead(Long id, Long userId) {
        notificationRepository.findById(id).ifPresent(n -> {
            if (n.getUser().getId().equals(userId)) {
                n.setRead(true);
                notificationRepository.save(n);
            }
        });
    }

    public long unreadCount(Long userId) {
        return notificationRepository.countByUserIdAndReadFalse(userId);
    }
}
