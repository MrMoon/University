package com.os.backend.algorithms.controller;

import com.os.backend.algorithms.model.AlgorithmRequest;
import com.os.backend.algorithms.model.AlgorithmResponse;
import com.os.backend.algorithms.service.RoundRobinService;
import com.os.backend.algorithms.service.SJFService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/schedule")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class SchedulingController {

    private final RoundRobinService roundRobinService;
    private final SJFService sjfService;

    @PostMapping("/rr/{quantum}")
    public AlgorithmResponse roundRobin(@PathVariable("quantum") Integer quantum, @RequestBody AlgorithmRequest algorithmRequest) {
        return roundRobinService.roundRobin(quantum, algorithmRequest);
    }

    @PostMapping("/sjf")
    public AlgorithmResponse sjf(@RequestBody AlgorithmRequest algorithmRequest) {
        return sjfService.sjf(algorithmRequest);
    }

    @PostMapping("/{quantum}")
    public AlgorithmResponse[] both(@PathVariable("quantum") Integer quantum, @RequestBody AlgorithmRequest algorithmRequest) {
        AlgorithmResponse[] algorithmResponses = new AlgorithmResponse[2];
        algorithmResponses[0] = roundRobinService.roundRobin(quantum, algorithmRequest);
        algorithmResponses[1] = sjf(algorithmRequest);
        return algorithmResponses;
    }

}
