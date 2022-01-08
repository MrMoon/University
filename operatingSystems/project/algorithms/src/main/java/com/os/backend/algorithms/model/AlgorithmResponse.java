package com.os.backend.algorithms.model;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@Builder
public class AlgorithmResponse {

    private double averageTurnAroundTime, averageResponseTime, averageWaitTime, throughput;
    private ArrayList<Process> processes;

}
