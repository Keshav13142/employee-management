package com.cognizant.EMS.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.EMS.entity.Employee;
import com.cognizant.EMS.repository.EmployeeRepository;

import at.favre.lib.crypto.bcrypt.BCrypt;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmployeeService {

  @Autowired
  private EmployeeRepository employeeRepository;

  public List<Employee> getAllEmployees() {
    return employeeRepository.findAll();
  }

  public Employee createEmployee(Employee employee) {
    String bcryptHashString = BCrypt.withDefaults().hashToString(12, employee.getPassword().toCharArray());
    employee.setPassword(bcryptHashString);
    employee.setTotalLeaveCount(36);
    employee.setTrainingSlot(10);

    return employeeRepository.save(employee);
  }

  public Boolean updatePassword(Long id, String password) {
    Employee emp = employeeRepository.findById(id).orElse(null);
    if (emp == null) {
      return false;
    }

    String bcryptHashString = BCrypt.withDefaults().hashToString(12, password.toCharArray());
    emp.setPassword(bcryptHashString);
    employeeRepository.save(emp);
    return true;
  }

  public Employee login(String email, String password) {
    Employee employee = employeeRepository.findByEmailId(email);

    if (employee == null ||
        !BCrypt.verifyer().verify(password.toCharArray(), employee.getPassword()).verified) {
      return null;
    }

    return employee;
  }

  public Employee getEmployee(Long id) {
    return employeeRepository.findById(id).orElse(null);
  }

  public Employee updateEmployee(Long id, Employee updatedEmployee) {
    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

    employee.setFirstName(updatedEmployee.getFirstName());
    employee.setLastName(updatedEmployee.getLastName());
    employee.setAge(updatedEmployee.getAge());
    employee.setMobileNumber(updatedEmployee.getMobileNumber());
    employee.setAddress(updatedEmployee.getAddress());
    employee.setEmailId(updatedEmployee.getEmailId());

    String newPass = updatedEmployee.getPassword();

    if (newPass != null) {
      if (!newPass.trim().equals("")) {
        String bcryptHashString = BCrypt.withDefaults().hashToString(12, updatedEmployee.getPassword().toCharArray());
        employee.setPassword(bcryptHashString);
      }
    }

    return employeeRepository.save(employee);
  }

  public void deleteEmployee(Long id) {
    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
    employeeRepository.delete(employee);
  }

  public void requestTrainingSlot(Long id) {
    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

    // Check if training slot is available
    if (employee.getTrainingSlot() > 0) {
      // Request training slot logic here
      // ...
    } else {
      throw new IllegalArgumentException("No available training slots");
    }
  }

  public void requestCertificate(Long id, String certificateType) {
    employeeRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

    // Request certificate logic here
    // ...
  }

  public Employee getEmployeeByEmailId(String emailId) {

    return employeeRepository.findByEmailId(emailId);
  }

  public void save(Employee employee) {
    employeeRepository.save(employee);

  }

}
