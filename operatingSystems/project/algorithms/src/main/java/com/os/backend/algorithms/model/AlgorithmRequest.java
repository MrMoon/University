package com.os.backend.algorithms.model;

import lombok.Data;

import java.util.List;

@Data
public class AlgorithmRequest {

    private int n;
    private List<Integer> burstTimes, arrivalTimes;

}
