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

            processes.get(idx).startTime = currentTime;
            processes.get(idx).completionTime = processes.get(idx).startTime + processes.get(idx).burstTime;
            processes.get(idx).turnAroundTime = processes.get(idx).completionTime - processes.get(idx).arrivalTime;
            processes.get(idx).waitingTime = processes.get(idx).turnAroundTime - processes.get(idx).burstTime;
            processes.get(idx).responseTime = processes.get(idx).startTime = processes.get(idx).arrivalTime;

            totalResponseTime += processes.get(idx).responseTime;;
            totalTurnAroundTime += processes.get(idx).turnAroundTime;
            totalWaitingTime += processes.get(idx).waitingTime;

            isCompleted.put(idx, true);
            ++completed;
            currentTime = processes.get(idx).completionTime;
        }

        int minArrivalTime = Integer.MAX_VALUE;
        int maxCompletionTime = -1;

        for (int i = 0 ; i < n ; ++i) {
            final Process currentProcess = processes.get(i);
            minArrivalTime = Math.min(minArrivalTime, currentProcess.arrivalTime);
            maxCompletionTime = Math.max(maxCompletionTime, currentProcess.completionTime);
        }

        averageResponseTime = (double) totalResponseTime/n;
        averageTurnAroundTime = (double) totalTurnAroundTime/n;
        averageWaitTime = (double) totalWaitingTime/n;
        throughput = (double) n / (maxCompletionTime - minArrivalTime);
    }
}
