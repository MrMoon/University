import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

public class RoundRobin {

    private int n, quantum;
    private int totalTurnAroundTime, totalWaitingTime, totalResponseTime;
    private ArrayList<Integer> burstRemaining;
    private Map<Integer, Boolean> isMarked;
    private ArrayList<Process> processes;

    public void goRoundRobin() {
        processes.sort((process1, process2) -> process1.arrivalTime < process2.arrivalTime ? 1 : 0);

        int currentTime = 0, completed = 0, idx = 0;
        int currentBurstTime = burstRemaining.get(0);
        Queue<Integer> q = new LinkedList<>();

        q.add(0);
        isMarked.put(0, true);

        while (completed != n) { // 0
            idx = q.remove();
            currentBurstTime = burstRemaining.get(idx);

            if (currentBurstTime == processes.get(idx).burstTime) {
                processes.get(idx).startTime = Math.max(currentTime, processes.get(idx).arrivalTime);
                currentTime = processes.get(idx).startTime;
            }

            if (currentBurstTime - quantum > 0) {
                currentBurstTime -= quantum;
                currentTime += quantum;
            } else {
                currentTime += currentBurstTime;
                currentBurstTime = 0;
                ++completed;

                processes.get(idx).completionTime = currentTime;
                processes.get(idx).turnAroundTime = processes.get(idx).completionTime - processes.get(idx).arrivalTime;
                processes.get(idx).waitingTime = processes.get(idx).turnAroundTime - processes.get(idx).burstTime;
                processes.get(idx).responseTime = processes.get(idx).startTime - processes.get(idx).arrivalTime;

                totalTurnAroundTime += processes.get(idx).turnAroundTime;
                totalWaitingTime += processes.get(idx).waitingTime;
                totalResponseTime += processes.get(idx).responseTime;
            }

            for (int i = 1 ; i < n ; ++i) {
                if (currentBurstTime > 0 && processes.get(i).arrivalTime <= currentTime && !isMarked.get(i)) {
                    q.add(i);
                    isMarked.put(i, true);
                }
            }

            if (currentBurstTime > 0)
                q.add(idx);

            if (q.isEmpty()) {
                for (int i = 1 ; i < n ; ++i) {
                    if (burstRemaining.get(i) > 0) {
                        q.add(i);
                        isMarked.put(i, true);
                        break;
                    }
                }
            }
        }

        double averageTurnAroundTime = (double) totalTurnAroundTime / n;
        double averageResponseTime = (double) totalResponseTime / n;
        double averageWaitTime = (double) totalWaitingTime / n;
        double throughput = (double) n / ( processes.get(n - 1).completionTime - processes.get(0).arrivalTime );
    }
}
