package com.os.backend.algorithms.model;

import lombok.Data;

import java.util.List;

@Data
public class AlgorithmRequest {

    private int n;
    private List<Integer> burstTimes, arrivalTimes;

    public AlgorithmRequest() {

    }

    public AlgorithmRequest(int n , List<Integer> burstTimes , List<Integer> arrivalTimes) {
        this.n = n;
        this.burstTimes = burstTimes;
        this.arrivalTimes = arrivalTimes;
    }

    public AlgorithmRequest(AlgorithmRequest algorithmRequest) {
        this(algorithmRequest.getN(), algorithmRequest.getBurstTimes(), algorithmRequest.getArrivalTimes());
    }
}
