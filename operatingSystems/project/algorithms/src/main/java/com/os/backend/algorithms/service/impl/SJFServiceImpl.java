package com.os.backend.algorithms.service.impl;

import com.os.backend.algorithms.model.AlgorithmRequest;
import com.os.backend.algorithms.model.AlgorithmResponse;
import com.os.backend.algorithms.model.Process;
import com.os.backend.algorithms.service.SJFService;
import com.os.backend.algorithms.utils.ProcessInfo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class SJFServiceImpl implements SJFService {
    @Override
    public AlgorithmResponse sjf(final AlgorithmRequest algorithmRequest) {
        final int N = algorithmRequest.getN();
        int totalTurnAroundTime = 0, totalWaitingTime = 0, totalResponseTime = 0;
        final ArrayList<Process> processes = algorithmRequest.getProcesses();
        final ArrayList<Integer> burstRemaining = algorithmRequest.getBurstRemaining();
        final Map<Integer, Boolean> isCompleted = new HashMap<>();
        int currentTime = 0, completed = 0, idx = -1, minBurstTime = Integer.MAX_VALUE;

        while (completed != N) {
            for (int i = 0 ; i < N ; ++i) {
                final Process process = processes.get(i);
                if (process.getArrivalTime() <= currentTime && isCompleted.get(i)) {
                    if (process.getBurstTime() < minBurstTime) {
                        minBurstTime = process.getBurstTime();
                        idx = i;
                    }
                    if (process.getBurstTime() == minBurstTime && (process.getArrivalTime() < processes.get(idx).getArrivalTime())) {
                        minBurstTime = process.getBurstTime();
                        idx = i;
                    }
                }
            }

            if (idx == -1) {
                ++currentTime;
                continue;
            }

            processes.get(idx).setStartTime(currentTime);
            processes.get(idx).setCompletionTime(processes.get(idx).getStartTime() + processes.get(idx).getBurstTime());
            ProcessInfo.updateProcessInfo(processes , idx);

            totalResponseTime += processes.get(idx).getResponseTime();;
            totalTurnAroundTime += processes.get(idx).getTurnAroundTime();
            totalWaitingTime += processes.get(idx).getWaitingTime();

            isCompleted.put(idx, true);
            ++completed;
            currentTime = processes.get(idx).getCompletionTime();
        }

        int minArrivalTime = Integer.MAX_VALUE;
        int maxCompletionTime = -1;

        for (int i = 0 ; i < N ; ++i) {
            final Process currentProcess = processes.get(i);
            minArrivalTime = Math.min(minArrivalTime, currentProcess.getArrivalTime());
            maxCompletionTime = Math.max(maxCompletionTime, currentProcess.getCompletionTime());
        }

        return AlgorithmResponse
                .builder()
                .averageResponseTime((double) totalResponseTime/N)
                .averageTurnAroundTime((double) totalTurnAroundTime/N)
                .averageWaitTime((double) totalWaitingTime/N)
                .throughput((double) N / (maxCompletionTime - minArrivalTime))
                .build();
    }
}
