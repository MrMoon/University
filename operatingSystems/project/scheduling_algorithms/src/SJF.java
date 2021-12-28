import java.util.ArrayList;
import java.util.Map;

public class SJF {

    private int n;
    private int totalTurnAroundTime, totalWaitingTime, totalResponseTime;
    private double averageTurnAroundTime, averageWaitTime, averageResponseTime, throughput;
    private ArrayList<Integer> burstRemaining;
    private Map<Integer, Boolean> isCompleted;
    private ArrayList<Process> processes;

    public void goShortestJobFirst() {
        Process currentProcess = processes.get(0);
        int currentTime = 0, completed = 0, idx = -1, minBurstTime = Integer.MAX_VALUE;

        while (completed != n) {
            for (int i = 0 ; i < n ; ++i) {
                final Process process = processes.get(i);
                if (process.arrivalTime <= currentTime && isCompleted.get(i)) {
                     if (process.burstTime < minBurstTime) {
                         minBurstTime = process.burstTime;
                         idx = i;
                     }
                     if (process.burstTime == minBurstTime && (process.arrivalTime < processes.get(idx).arrivalTime)) {
                         minBurstTime = process.burstTime;
                         idx = i;
                     }
                 }
            }

            if (idx == -1) {
                ++currentTime;
                continue;
            }

            currentProcess = processes.get(idx);
            currentProcess.startTime = currentTime;
            currentProcess.completionTime = currentProcess.startTime + currentProcess.burstTime;
            currentProcess.turnAroundTime = currentProcess.completionTime - currentProcess.arrivalTime;
            currentProcess.waitingTime = currentProcess.turnAroundTime - currentProcess.burstTime;
            currentProcess.responseTime = currentProcess.startTime = currentProcess.arrivalTime;

            totalResponseTime += currentProcess.responseTime;;
            totalTurnAroundTime += currentProcess.turnAroundTime;
            totalWaitingTime += currentProcess.waitingTime;

            isCompleted.put(idx, true);
            ++completed;
            currentTime = currentProcess.completionTime;
        }

        int minArrivalTime = Integer.MAX_VALUE;
        int maxCompletionTime = -1;

        for (int i = 0 ; i < n ; ++i) {
            currentProcess = processes.get(i);
            minArrivalTime = Math.min(minArrivalTime, currentProcess.arrivalTime);
            maxCompletionTime = Math.max(maxCompletionTime, currentProcess.completionTime);
        }

        averageResponseTime = (double) totalResponseTime/n;
        averageTurnAroundTime = (double) totalTurnAroundTime/n;
        averageWaitTime = (double) totalWaitingTime/n;
        throughput = (double) n / (maxCompletionTime - minArrivalTime);
    }
}
