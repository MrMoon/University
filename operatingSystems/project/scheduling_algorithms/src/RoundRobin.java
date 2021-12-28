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
        Process currentProcess = processes.get(0);
        int currentBurstTime = burstRemaining.get(0);
        Queue<Integer> q = new LinkedList<>();

        q.add(0);
        isMarked.put(0, true);

        while (completed != n) {
            idx = q.remove();
            currentProcess = processes.get(idx);
            currentBurstTime = burstRemaining.get(idx);

            if (currentBurstTime == currentProcess.burstTime) {
                currentProcess.startTime = Math.max(currentTime, currentProcess.arrivalTime);
                currentTime = currentProcess.startTime;
            }

            if (currentBurstTime - quantum > 0) {
                currentBurstTime -= quantum;
                currentTime += quantum;
            } else {
                currentTime += currentBurstTime;
                currentBurstTime = 0;
                ++completed;

                currentProcess.completionTime = currentTime;
                currentProcess.turnAroundTime = currentProcess.completionTime - currentProcess.arrivalTime;
                currentProcess.waitingTime = currentProcess.turnAroundTime - currentProcess.burstTime;
                currentProcess.responseTime = currentProcess.startTime - currentProcess.arrivalTime;

                totalTurnAroundTime += currentProcess.turnAroundTime;
                totalWaitingTime += currentProcess.waitingTime;
                totalResponseTime += currentProcess.responseTime;
            }

            for (int i = 1 ; i < n ; ++i) {
                if (currentBurstTime > 0 && processes.get(i).arrivalTime <= currentTime && !isMarked.get(i)) {
                    q.add(i);
                    isMarked.put(i, true);
                }
            }

            if (currentBurstTime > 0)
                q.add(idx);


            processes.set(idx, currentProcess);
            burstRemaining.set(idx, currentBurstTime);

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
