package com.cognizant.EMS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.EMS.entity.Absences;

public interface AbsencesRepository extends JpaRepository<Absences, Long> {

  List<Absences> findByEmpId(Long empId);

}
