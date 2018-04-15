package com.topsec.ti.zxg.repository;

import com.topsec.ti.zxg.domain.Iplocate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IpLocateRepository extends JpaRepository<Iplocate,String> {
}
