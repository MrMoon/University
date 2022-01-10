package com.os.backend.algorithms.service.impl;

import com.os.backend.algorithms.model.AlgorithmRequest;
import com.os.backend.algorithms.model.AlgorithmResponse;
import com.os.backend.algorithms.model.Process;
import com.os.backend.algorithms.service.RoundRobinService;
import com.os.backend.algorithms.utils.ProcessInfo;
import org.springframework.stereotype.Service;

import java.util.*;

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
public class RoundRobinServiceImpl implements RoundRobinService {
    @Override
    public AlgorithmResponse roundRobin(final int quantum, final AlgorithmRequest algorithmRequest) {
        final int N = algorithmRequest.getN();
        final List<Integer> arrivalTimes = algorithmRequest.getArrivalTimes();
        final List<Integer> burstTimes = algorithmRequest.getBurstTimes();
        final Map<Integer, Boolean> isMarked = new HashMap<>();
        int totalTurnAroundTime = 0, totalWaitingTime = 0, totalResponseTime = 0;

        final List<Process> processes = new ArrayList<>();
        for (int i = 0 ; i < N ; ++i) {
            processes.add(Process
                    .builder()
                    .pid(i)
                    .burstTime(burstTimes.get(i))
                    .arrivalTime(arrivalTimes.get(i))
                    .build());
        }

        processes.sort((process1, process2) -> process1.getArrivalTime() < process2.getArrivalTime() ? 1 : 0);

        int currentTime = 0, completed = 0, idx = 0;
        Queue<Integer> q = new LinkedList<>();

        q.add(0);
        isMarked.put(0, true);

        while (completed != N) {
            idx = q.remove();

            if (burstTimes.get(idx) == processes.get(idx).getBurstTime()) {
                processes.get(idx).setStartTime(Math.max(currentTime, processes.get(idx).getArrivalTime()));
                currentTime = processes.get(idx).getStartTime();
            }

            if (burstTimes.get(idx) - quantum > 0) {
                burstTimes.set(idx, burstTimes.get(idx) - quantum);
                currentTime += quantum;
            } else {
                currentTime += burstTimes.get(idx);
                burstTimes.set(idx, 0);
                ++completed;

                processes.get(idx).setCompletionTime(currentTime);
                ProcessInfo.updateProcessInfo(processes , idx);

                totalTurnAroundTime += processes.get(idx).getTurnAroundTime();
                totalWaitingTime += processes.get(idx).getWaitingTime();
                totalResponseTime += processes.get(idx).getResponseTime();
            }

            for (int i = 1 ; i < N ; ++i) {
                if (burstTimes.get(idx) > 0 && processes.get(i).getArrivalTime() <= currentTime && (isMarked.containsKey(i) && !isMarked.get(i))) {
                    q.add(i);
                    isMarked.put(i, true);
                }
            }

            if (burstTimes.get(idx) > 0)
                q.add(idx);

            if (q.isEmpty()) {
                for (int i = 1 ; i < N ; ++i) {
                    if (burstTimes.get(i) > 0) {
                        q.add(i);
                        isMarked.put(i, true);
                        break;
                    }
                }
            }
        }

        processes.sort((process1, process2) -> process1.getPid() < process2.getPid() ? 1 : 0);

        return AlgorithmResponse
                .builder()
                .averageTurnAroundTime((double) totalTurnAroundTime / N)
                .averageResponseTime((double) totalResponseTime / N)
                .averageWaitTime((double) totalWaitingTime / N)
                .throughput((double) N / ( processes.get(N - 1).getCompletionTime() - processes.get(0).getArrivalTime() ))
                .processes(processes)
                .build();
    }
}