package com.cognizant.EMS.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.EMS.entity.Absences;
import com.cognizant.EMS.entity.Employee;
import com.cognizant.EMS.repository.AbsencesRepository;
import com.cognizant.EMS.repository.EmployeeRepository;

@Service
public class AbsencesService {

  @Autowired
  private AbsencesRepository absencesRepository;

  @Autowired
  private EmployeeRepository employeeRepository;

  public List<Absences> getAllAbsences() {
    return absencesRepository.findAll();
  }

  public Optional<Absences> getAbsencesById(long id) {
    return absencesRepository.findById(id);
  }

  public Absences createAbsences(Absences absences) {
    Employee employee = absences.getEmp();
    int count = calculateCount(absences);
    int availableLeaveCount = employee.getTotalLeaveCount();
    if (availableLeaveCount < count) {
      throw new IllegalArgumentException("Insufficient leave balance");
    }
    employee.setTotalLeaveCount(availableLeaveCount - count);
    employeeRepository.save(employee);
    Absences res = absencesRepository.save(absences);

    return res;
  }

  public Absences updateAbsences(Long id, Absences updatedAbsences) {
    Absences absences = absencesRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
    if (updatedAbsences.hasFromDate()) {
      absences.setFromDate(updatedAbsences.getFromDate());
    }

    if (updatedAbsences.hasToDate()) {
      absences.setToDate(updatedAbsences.getToDate());
    }

    if (updatedAbsences.hasreason()) {
      absences.setReason(updatedAbsences.getReason());
    }

    if (updatedAbsences.hasempid()) {
      absences.setEmp(updatedAbsences.getEmp());
    }

    return absencesRepository.save(absences);
  }

  public boolean deleteAbsences(Long id) {
    absencesRepository.deleteById(id);
    return false;
  }

  public int calculateCount(Absences absences) {
    LocalDate fromDate = convertToLocalDate(absences.getFromDate());
    LocalDate toDate = convertToLocalDate(absences.getToDate());

    long daysBetween = ChronoUnit.DAYS.between(fromDate, toDate);
    int count = Math.toIntExact(daysBetween) + 1; // Add 1 to include both the from and to dates
    absences.setCount(count);
    return count;

  }

  private LocalDate convertToLocalDate(Date date) {
    return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
  }

}
