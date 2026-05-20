package com.ninaorganization.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardStatsResponse {
    private long totalUsers;
    private long totalJobs;
    private long totalApplications;
    private long totalEvents;
    private long jobSeekers;
    private long hrUsers;
    private long bannedUsers;
    private long selectedCandidates;
    private long pendingApplications;
}
