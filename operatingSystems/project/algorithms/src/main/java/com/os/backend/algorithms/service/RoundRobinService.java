package com.os.backend.algorithms.service;

import com.os.backend.algorithms.model.AlgorithmRequest;
import com.os.backend.algorithms.model.AlgorithmResponse;

public interface RoundRobinService {

    AlgorithmResponse roundRobin(final int quantum, final AlgorithmRequest process);

}
