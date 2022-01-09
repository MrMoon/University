package com.os.backend.algorithms.service.impl;

import com.os.backend.algorithms.model.AlgorithmRequest;
import com.os.backend.algorithms.model.AlgorithmResponse;
import com.os.backend.algorithms.model.Process;
import com.os.backend.algorithms.service.SJFService;
import com.os.backend.algorithms.utils.ProcessInfo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
AT - Arrival Time of the process
BT - Burst time of the process
ST - Start time of the process
CT - Completion time of the process
TAT - Turnaround time of the process
WT - Waiting time of the process
RT - Response time of the process
Formulas used:
TAT = CT - AT
WT = TAT - BT
RT = ST - AT
*/
@Service
public class SJFServiceImpl implements SJFService {
    @Override
    public AlgorithmResponse sjf(final AlgorithmRequest algorithmRequest) {
        final int N = algorithmRequest.getN();
        int totalTurnAroundTime = 0, totalWaitingTime = 0, totalResponseTime = 0;
        final List<Integer> arrivalTimes = algorithmRequest.getArrivalTimes();
        final List<Integer> burstTimes = algorithmRequest.getBurstTimes();
        final Map<Integer, Boolean> isCompleted = new HashMap<>();
        int currentTime = 0, completed = 0, idx = -1, minBurstTime = Integer.MAX_VALUE;

        final List<Process> processes = new ArrayList<>();
        for (int i = 0 ; i < N ; ++i) {
            processes.add(Process
                    .builder()
                    .pid(i)
                    .burstTime(burstTimes.get(i))
                    .arrivalTime(arrivalTimes.get(i))
                    .build());
        }

        while (completed != N) {
            idx = -1;
            minBurstTime = Integer.MAX_VALUE;
            for (int i = 0 ; i < N ; ++i) {
                final Process process = processes.get(i);
                 if (process.getArrivalTime() <= currentTime && !isCompleted.getOrDefault(i, false)) {
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
                .processes(processes)
                .build();
    }
}
