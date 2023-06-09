package com.cognizant.EMS.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.EMS.entity.JobDepartment;
import com.cognizant.EMS.repository.JobDepartmentRepository;

@Service
public class JobDepartmentService {

  @Autowired
  private JobDepartmentRepository jobDepartmentRepository;

  public List<JobDepartment> getAllJobDepartment() {
    return jobDepartmentRepository.findAll();
  }

  public Optional<JobDepartment> getJobDepartmentById(long id) {
    return jobDepartmentRepository.findById(id);
  }

  public JobDepartment createJobDepartment(JobDepartment jobDepartment) {
    return jobDepartmentRepository.save(jobDepartment);
  }

  public JobDepartment updateJobDepartment(Long id, String deptName) {
    JobDepartment dept = jobDepartmentRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
    dept.setDeptName(deptName);
    jobDepartmentRepository.save(dept);
    return dept;
  }

  public boolean deleteJobDepartment(Long id) {
    jobDepartmentRepository.deleteById(id);
    return false;
  }

}
