package com.os.backend.algorithms.utils;

import com.os.backend.algorithms.model.Process;

import java.util.List;

public class ProcessInfo {

    public static void updateProcessInfo(List<Process> processes , int idx) {
        processes.get(idx).setTurnAroundTime(processes.get(idx).getCompletionTime() - processes.get(idx).getArrivalTime());
        processes.get(idx).setWaitingTime( processes.get(idx).getTurnAroundTime() - processes.get(idx).getBurstTime());
        processes.get(idx).setResponseTime(processes.get(idx).getStartTime() - processes.get(idx).getArrivalTime());
    }

}
