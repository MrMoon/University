package com.os.backend.algorithms.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Process {
    private int pid, arrivalTime, burstTime, startTime, completionTime, turnAroundTime, waitingTime, responseTime;
}
