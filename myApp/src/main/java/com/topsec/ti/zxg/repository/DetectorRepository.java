package com.topsec.ti.zxg.repository;

import com.topsec.ti.zxg.domain.device.Detector;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by hx on 17-2-20.
 */
public interface DetectorRepository extends JpaRepository<Detector,String> {
    Detector findByDeviceId(String deviceId);
}
