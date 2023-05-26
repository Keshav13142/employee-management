package com.cognizant.EMS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.EMS.Exception.ResourceNotFoundException;
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
    return ResponseEntity.ok(employees);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id) throws ResourceNotFoundException {
    Employee employee = employeeService.getEmployee(id);
    if (employee != null) {
      return ResponseEntity.ok(employee);

    } else {
      throw new ResourceNotFoundException("Employee not found");
    }

  }

  @PostMapping
  public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
    Employee createdEmployee = employeeService.createEmployee(employee);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Long id, @RequestBody Employee updatedEmployee)
      throws ResourceNotFoundException {
    Employee employee = employeeService.updateEmployee(id, updatedEmployee);

    if (employee != null) {
      return ResponseEntity.ok(employee);
    } else {
      throw new ResourceNotFoundException("There is employee data in this id");
    }

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteEmployee(@PathVariable("id") Long id) {
    employeeService.deleteEmployee(id);
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
  public ResponseEntity<Employee> login(@RequestBody LoginForm login) {
    if (login.getEmailId() == null || login.getPassword() == null) {
      return ResponseEntity.status(418).body(null);
    }

    Employee emp = employeeService.login(login.getEmailId(), login.getPassword());
    if (emp != null) {
      return ResponseEntity.ok(emp);
    }

    return ResponseEntity.status(418).body(null);
  }

}
