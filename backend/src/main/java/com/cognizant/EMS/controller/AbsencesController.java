package com.cognizant.EMS.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
  public List<Absences> getAllAbsences() {
    log.info("Successfully fetched all the  employee's absence detail's ");
    return absencesService.getAllAbsences();
  }

  @GetMapping("/{id}")
  public Optional<Absences> getAbsencesById(@PathVariable Long id) throws ResourceNotFoundException {
    log.info("Successfully fetched the employee absence detail's ");
    Optional<Absences> absences = absencesService.getAbsencesById(id);

    if (!absences.isPresent()) {
      throw new ResourceNotFoundException("Not Found ");
    }

    return absencesService.getAbsencesById(id);

  }

  @PostMapping("/{id}")
  public ResponseEntity<Object> applyLeave(@PathVariable("id") Long id, @RequestBody Absences absences) {
    // try {
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
