package com.os.backend.algorithms.model;

import lombok.Data;

@Data
public class Process {
    private int pid, arrivalTime, burstTime, startTime, completionTime, turnAroundTime, waitingTime, responseTime;
}
