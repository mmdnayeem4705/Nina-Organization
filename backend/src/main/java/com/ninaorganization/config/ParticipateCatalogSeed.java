package com.ninaorganization.config;

import com.ninaorganization.entity.Event;
import com.ninaorganization.entity.User;
import com.ninaorganization.entity.enums.EventType;
import com.ninaorganization.repository.EventRepository;
import com.ninaorganization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Order(4)
@RequiredArgsConstructor
public class ParticipateCatalogSeed implements CommandLineRunner {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (eventRepository.count() >= 15) return;
        User hr = userRepository.findByEmail("hr@nina.com").orElse(null);
        if (hr == null) return;
        catalog(hr).forEach(eventRepository::save);
    }

    private List<Event> catalog(User hr) {
        LocalDateTime now = LocalDateTime.now();
        return List.of(
                ev("AI Innovation Hackathon 2026", "Build AI-powered solutions for real business problems.",
                        EventType.HACKATHON, now.plusDays(30), now.plusDays(32), "Online",
                        "₹50,000", "2-4", "AI", 500, true, hr),
                ev("Nina Code Sprint 2026", "48-hour hackathon. Full-stack or mobile. Prizes up to ₹1L.",
                        EventType.HACKATHON, now.plusDays(45), now.plusDays(47), "Online",
                        "₹1,00,000", "2-4", "Full Stack", 800, true, hr),
                ev("Web3 Builders Hackathon", "Smart contracts and dApps on EVM chains.",
                        EventType.HACKATHON, now.plusDays(60), now.plusDays(62), "Online",
                        "₹75,000", "2-3", "Web3", 300, false, hr),
                ev("Weekly Coding Contest #42", "Timed 90-minute contest. Live rankings.",
                        EventType.CONTEST, now.plusDays(7), now.plusDays(7).plusHours(3), "Online",
                        "₹10,000", "Solo", "DSA", 1000, true, hr),
                ev("Monthly Grand Contest", "Hard problems. Top 10 get swag + interview fast-track.",
                        EventType.CONTEST, now.plusDays(28), now.plusDays(28).plusHours(4), "Online",
                        "₹25,000", "Solo", "Algorithms", 2000, true, hr),
                ev("Spring Boot Live Workshop", "Hands-on REST APIs, JPA, and Security.",
                        EventType.WORKSHOP, now.plusDays(14), now.plusDays(14).plusHours(4), "Virtual",
                        "Certificate", "Solo", "Backend", 200, true, hr),
                ev("React 19 Workshop", "Server components, hooks, and deployment.",
                        EventType.WORKSHOP, now.plusDays(21), now.plusDays(21).plusHours(5), "Virtual",
                        "Certificate", "Solo", "Frontend", 250, false, hr),
                ev("Docker & Kubernetes Workshop", "Containerize and deploy microservices.",
                        EventType.WORKSHOP, now.plusDays(18), now.plusDays(18).plusHours(6), "Hybrid",
                        "Certificate", "Solo", "DevOps", 150, false, hr),
                ev("Generative AI Workshop", "LLMs, RAG, and prompt engineering labs.",
                        EventType.WORKSHOP, now.plusDays(25), now.plusDays(25).plusHours(4), "Online",
                        "Certificate", "Solo", "AI", 180, true, hr),
                ev("Cloud Architecture Seminar", "AWS, scaling, and cost optimization.",
                        EventType.SEMINAR, now.plusDays(10), now.plusDays(10).plusHours(2), "Online",
                        null, null, "Cloud", 500, false, hr),
                ev("Cybersecurity Threat Landscape", "SOC, OWASP, and incident response.",
                        EventType.SEMINAR, now.plusDays(12), now.plusDays(12).plusHours(2), "Online",
                        null, null, "Cybersecurity", 400, false, hr),
                ev("Web3 & Blockchain Tech Talk", "DeFi trends and smart contract security.",
                        EventType.SEMINAR, now.plusDays(20), now.plusDays(20).plusHours(1), "Online",
                        null, null, "Web3", 350, false, hr),
                ev("Career Webinar: Product vs Service", "Panel with Nina engineers and HR.",
                        EventType.WEBINAR, now.plusDays(5), now.plusDays(5).plusHours(1), "Online",
                        null, null, "Career", 1000, true, hr),
                ev("DevOps Live Stream Day", "Live CI/CD pipeline build on stream.",
                        EventType.WEBINAR, now.plusDays(8), now.plusDays(8).plusHours(3), "Online",
                        null, null, "DevOps", 600, false, hr),
                ev("Project Showcase Competition", "Submit GitHub projects. Judges from Nina HR.",
                        EventType.CONTEST, now.plusDays(35), now.plusDays(40), "Online",
                        "₹30,000", "1-3", "Innovation", 400, true, hr),
                ev("Blockchain Innovation Challenge", "Solve real-world supply chain on-chain.",
                        EventType.HACKATHON, now.plusDays(50), now.plusDays(52), "Online",
                        "₹35,000", "2-4", "Blockchain", 250, false, hr)
        );
    }

    private Event ev(String title, String desc, EventType type, LocalDateTime start, LocalDateTime end,
                     String loc, String prize, String team, String topic, int max, boolean featured, User hr) {
        return Event.builder()
                .title(title).description(desc).type(type)
                .startDate(start).endDate(end).location(loc)
                .prizePool(prize).teamSize(team).topic(topic)
                .maxParticipants(max).featured(featured)
                .registeredCount((int) (Math.random() * max / 3))
                .createdBy(hr).active(true)
                .build();
    }
}
