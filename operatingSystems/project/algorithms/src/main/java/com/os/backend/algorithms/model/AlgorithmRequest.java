package com.os.backend.algorithms.model;

import lombok.Data;

import java.util.ArrayList;

@Data
public class AlgorithmRequest {

    private int n;
    private ArrayList<Process> processes;
    private ArrayList<Integer> burstRemaining;

}
