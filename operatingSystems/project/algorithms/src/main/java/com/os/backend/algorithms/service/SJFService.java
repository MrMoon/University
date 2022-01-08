package com.os.backend.algorithms.service;

import com.os.backend.algorithms.model.AlgorithmRequest;
import com.os.backend.algorithms.model.AlgorithmResponse;

public interface SJFService {

    AlgorithmResponse sjf(final AlgorithmRequest algorithmRequest);

}
