package com.os.backend.algorithms.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AlgorithmResponse {

    private double averageTurnAroundTime, averageResponseTime, averageWaitTime, throughput;

}
