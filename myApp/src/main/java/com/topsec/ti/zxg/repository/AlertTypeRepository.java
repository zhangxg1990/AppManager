package com.topsec.ti.zxg.repository;


import com.topsec.ti.zxg.domain.alert.AlertType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AlertTypeRepository extends JpaRepository<AlertType,String> {
    @Query("select j from AlertType j where j.parent is null")
    AlertType getRoot();
}
