package com.cognizant.EMS.controller;

import java.util.List;

import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cognizant.EMS.Exception.ResourceNotFoundException;
import com.cognizant.EMS.entity.Admin;
import com.cognizant.EMS.entity.Employee;
import com.cognizant.EMS.service.AdminService;
import com.cognizant.EMS.service.EmployeeService;

import lombok.extern.slf4j.Slf4j;

class LoginForm {
  private String emailId;
  private String password;

  public String getEmailId() {
    return emailId;
  }

  public String getPassword() {
    return password;
  }

  public void setEmailId(String email) {
    this.emailId = email;
  }

  public void setPassword(String pass) {
    this.password = pass;
  }

  @Override
  public String toString() {
    return "Email :" + emailId + "\n" + "Password:" + password;
  }
}

@RestController
@CrossOrigin("*")
@RequestMapping("/employees")
@Slf4j
public class EmployeeController {
  @Autowired
  private final EmployeeService employeeService;

  @Autowired
  private final AdminService adminService;

  public EmployeeController(EmployeeService employeeService, AdminService adminService) {
    this.employeeService = employeeService;
    this.adminService = adminService;
  }

  @GetMapping
  public ResponseEntity<List<Employee>> getAllEmployees() {
    List<Employee> employees = employeeService.getAllEmployees();
    log.info("Successfully fetched all the employee details");
    return ResponseEntity.ok(employees);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id) throws ResourceNotFoundException {
    Employee employee = employeeService.getEmployee(id);
    if (employee != null) {
      log.info("Successfully fetched");
      return ResponseEntity.ok(employee);

    } else {
      throw new ResourceNotFoundException("Employee not found");
    }

  }

  @PostMapping
  public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
    Employee createdEmployee = employeeService.createEmployee(employee);
    log.info("Successfully created");
    return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Long id, @RequestBody Employee updatedEmployee)
      throws ResourceNotFoundException {
    Employee employee = employeeService.updateEmployee(id, updatedEmployee);

    if (employee != null) {
      log.info("Successfully updated the employee data");
      return ResponseEntity.ok(employee);
    } else {
      throw new ResourceNotFoundException("There is employee data in this id");
    }

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteEmployee(@PathVariable("id") Long id) {
    employeeService.deleteEmployee(id);
    log.info("Successfully deleted the data");
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/{id}/request-training-slot")
  public ResponseEntity<Void> requestTrainingSlot(@PathVariable("id") Long id) {
    employeeService.requestTrainingSlot(id);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/{id}/request-certificate")
  public ResponseEntity<Void> requestCertificate(@PathVariable("id") Long id,
      @RequestParam("certificateType") String certificateType) {
    employeeService.requestCertificate(id, certificateType);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/login")
  public ResponseEntity<Boolean> login(@RequestBody LoginForm login) {
    if (login.getEmailId() == null || login.getPassword() == null) {
      return ResponseEntity.status(418).body(false);
    }

    boolean success = employeeService.login(login.getEmailId(), login.getPassword());
    if (success) {
      return ResponseEntity.ok(true);
    }

    return ResponseEntity.status(418).body(false);
  }

}
