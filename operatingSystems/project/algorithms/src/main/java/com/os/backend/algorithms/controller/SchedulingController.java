package com.os.backend.algorithms.controller;

import com.os.backend.algorithms.model.AlgorithmRequest;
import com.os.backend.algorithms.model.AlgorithmResponse;
import com.os.backend.algorithms.service.RoundRobinService;
import com.os.backend.algorithms.service.SJFService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class SchedulingController {

    private final RoundRobinService roundRobinService;
    private final SJFService sjfService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/rr/{quantum}")
    public AlgorithmResponse roundRobin(@PathVariable("quantum") Integer quantum, @RequestBody AlgorithmRequest algorithmRequest) {
        return roundRobinService.roundRobin(quantum, algorithmRequest);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/sjf")
    public AlgorithmResponse sjf(@RequestBody AlgorithmRequest algorithmRequest) {
        return sjfService.sjf(algorithmRequest);
    }

}
