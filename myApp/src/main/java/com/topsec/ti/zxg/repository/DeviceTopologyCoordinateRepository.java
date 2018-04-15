package com.topsec.ti.zxg.repository;

import com.topsec.ti.zxg.domain.device.DeviceTopologyCoordinate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceTopologyCoordinateRepository   extends JpaRepository<DeviceTopologyCoordinate,String> {

}
