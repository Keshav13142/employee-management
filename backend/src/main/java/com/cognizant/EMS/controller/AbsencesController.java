package com.cognizant.EMS.controller;

import java.util.List;
import java.util.Optional;

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
import com.cognizant.EMS.entity.Absences;
import com.cognizant.EMS.entity.Employee;
import com.cognizant.EMS.service.AbsencesService;
import com.cognizant.EMS.service.EmployeeService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/absences")
@CrossOrigin("*")
@Slf4j
public class AbsencesController {

  @Autowired
  private final AbsencesService absencesService;
  private final EmployeeService employeeService;

  public AbsencesController(AbsencesService absencesService, EmployeeService employeeService) {
    this.absencesService = absencesService;
    this.employeeService = employeeService;
  }

  //
  @GetMapping
  public List<Absences> getAllAbsences(@RequestParam(value = "empId") Optional<Long> id) {
    if (!id.isPresent()) {
      return absencesService.getAllAbsences();
    }
    return absencesService.getAbsencesByEmpId(id.get());
  }

  @GetMapping("/{id}")
  public Optional<Absences> getAbsencesById(@PathVariable Long id) throws ResourceNotFoundException {
    Optional<Absences> absences = absencesService.getAbsencesById(id);

    if (!absences.isPresent()) {
      throw new ResourceNotFoundException("Not Found ");
    }

    return absencesService.getAbsencesById(id);

  }

  @PostMapping("/{id}")
  public ResponseEntity<Object> applyLeave(@PathVariable("id") Long id, @RequestBody Absences absences) {
    Employee employee = employeeService.getEmployee(id);
    if (employee != null) {
      absences.setEmp(employee);
      return ResponseEntity.status(HttpStatus.CREATED).body(absencesService.createAbsences(absences));
    }
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Emp Id");
  }

  @PutMapping("/{id}")
  public ResponseEntity<Absences> updateAbsences(@PathVariable("id") Long id, @RequestBody Absences absences)
      throws ResourceNotFoundException {
    if (absencesService.getAbsencesById(id).isPresent()) {
      absences.setId(id);
      Absences updatedAbsences = absencesService.updateAbsences(id, absences);
      return ResponseEntity.ok(updatedAbsences);
    } else {
      throw new ResourceNotFoundException("Absences not found with ID: " + id);
    }
  }

  @DeleteMapping("/{id}")
  public boolean deleteAbsencesById(@PathVariable Long id) {
    return absencesService.deleteAbsences(id);
  }
}
