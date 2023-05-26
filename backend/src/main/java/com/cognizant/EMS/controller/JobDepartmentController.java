package com.cognizant.EMS.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.EMS.Exception.ResourceNotFoundException;
import com.cognizant.EMS.entity.JobDepartment;
import com.cognizant.EMS.service.JobDepartmentService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/department")
@CrossOrigin("*")
@Slf4j
public class JobDepartmentController {

  @Autowired
  private JobDepartmentService jobDepartmentService;

  @GetMapping
  public List<JobDepartment> getAllJobDepartment() {
    return jobDepartmentService.getAllJobDepartment();
  }

  @GetMapping("/{id}")
  public Optional<JobDepartment> getJobDepartmentById(@PathVariable Long id) {
    return jobDepartmentService.getJobDepartmentById(id);
  }

  @PostMapping
  public JobDepartment createJobDepartment(@RequestBody JobDepartment jobDepartment) {
    return jobDepartmentService.createJobDepartment(jobDepartment);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateJobDepartment(@PathVariable Long id, @RequestBody JobDepartment dept) {
    jobDepartmentService.updateJobDepartment(id, dept.getDeptName());
    return ResponseEntity.ok().build();

  }

  @DeleteMapping("/{id}")
  public boolean deleteJobDepartmentById(@PathVariable Long id) throws ResourceNotFoundException {
    Optional<JobDepartment> obj = jobDepartmentService.getJobDepartmentById(id);
    if (obj != null) {
      return jobDepartmentService.deleteJobDepartment(id);
    } else {
      throw new ResourceNotFoundException("The department doesn't exist");
    }
  }

}
