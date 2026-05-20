package com.ninaorganization.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ninaorganization.dto.response.InternshipResponse;
import com.ninaorganization.entity.Internship;
import com.ninaorganization.entity.enums.InternshipLevel;
import com.ninaorganization.entity.enums.WorkMode;
import com.ninaorganization.exception.ResourceNotFoundException;
import com.ninaorganization.repository.InternshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InternshipService {

    private final InternshipRepository internshipRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Page<InternshipResponse> list(String domain, String category, WorkMode workMode,
                                           InternshipLevel level, Boolean featured,
                                           Boolean liveProject, Boolean ppo, String search,
                                           Long userId, Pageable pageable) {
        return internshipRepository.search(domain, category, workMode, level, featured, liveProject, ppo, search, pageable)
                .map(i -> toResponse(i, userId));
    }

    public InternshipResponse getById(Long id, Long userId) {
        Internship i = internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));
        return toResponse(i, userId);
    }

    public List<String> getDomains() {
        return internshipRepository.findDistinctDomains();
    }

    public List<String> getCategories() {
        return internshipRepository.findDistinctCategories();
    }

    private InternshipResponse toResponse(Internship i, Long userId) {
        return InternshipResponse.builder()
                .id(i.getId())
                .title(i.getTitle())
                .description(i.getDescription())
                .domain(i.getDomain())
                .category(i.getCategory())
                .location(i.getLocation())
                .duration(i.getDuration())
                .stipend(i.getStipend())
                .stipendLabel(i.getStipendLabel())
                .virtual(i.isVirtual())
                .certificateProvided(i.isCertificateProvided())
                .smallProject(i.isSmallProject())
                .featured(i.isFeatured())
                .liveProject(i.isLiveProject())
                .ppoAvailable(i.isPpoAvailable())
                .skillBased(i.isSkillBased())
                .workMode(i.getWorkMode())
                .level(i.getLevel())
                .requiredSkills(parseList(i.getRequiredSkills()))
                .tasks(parseList(i.getTasks()))
                .mentorName(i.getMentorName())
                .mentorRole(i.getMentorRole())
                .mentorExperience(i.getMentorExperience())
                .mentorLinkedIn(i.getMentorLinkedIn())
                .progressWeeks(parseList(i.getProgressWeeks()))
                .openings(i.getOpenings())
                .appliedCount(i.getAppliedCount())
                .deadline(i.getDeadline())
                .matchScore(userId != null ? computeMatchScore(i) : null)
                .build();
    }

    private List<String> parseList(String json) {
        if (json == null || json.isBlank()) return Collections.emptyList();
        try {
            if (json.trim().startsWith("[")) {
                return objectMapper.readValue(json, new TypeReference<>() {});
            }
            return Arrays.stream(json.split(",")).map(String::trim).filter(s -> !s.isEmpty()).collect(Collectors.toList());
        } catch (Exception e) {
            return Arrays.stream(json.split(",")).map(String::trim).collect(Collectors.toList());
        }
    }

    private int computeMatchScore(Internship i) {
        int base = 65 + ThreadLocalRandom.current().nextInt(30);
        if (i.isFeatured()) base += 3;
        if (i.isPpoAvailable()) base += 2;
        return Math.min(98, base);
    }
}
