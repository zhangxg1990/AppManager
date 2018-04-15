package com.topsec.ti.zxg.service;

import com.topsec.ti.zxg.domain.device.Detector;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DetectorService {
    Detector createDetector(Detector detector);

    Detector getDetector(String id);

    Detector updateDetector(Detector detector, String id);

    Detector deleteDetector(String id);

    List<Detector> getAllDetector();

    Page<Detector> getAllDetector(Integer pageNo, Integer pageSize);
}
