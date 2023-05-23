package com.cognizant.EMS.repository;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.EMS.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

  Employee findByEmailId(String emailId);

}
