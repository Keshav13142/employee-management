package com.cognizant.EMS.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "absences")
@Getter
@Setter
@NoArgsConstructor
public class Absences {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "from_date", nullable = false)
  private Date fromDate;
  @JsonIgnore
  @Transient
  private boolean hasFromDate = false;

  @Column(name = "to_date", nullable = false)
  private Date toDate;
  @JsonIgnore
  @Transient
  private boolean hasToDate = false;

  // @Column(name = "count")
  private int count;

  @Column(name = "reason")
  private String reason;
  @JsonIgnore
  @Transient
  private boolean hasreason = false;

  @OneToOne
  @JoinColumn(name = "emp_id", nullable = false)
  private Employee emp;
  @JsonIgnore
  @Transient
  private boolean hasempid = false;

  @Override
  public String toString() {
    return "absences [FromDate=" + this.fromDate + ", ToDate=" + toDate + ", reason=" + reason + ", empid=" + emp
        + "]";
  }

  public Date getFromDate() {
    return fromDate;
  }

  public void setFromDate(Date fromDate) {
    this.fromDate = fromDate;
    this.hasFromDate = true;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Date getToDate() {
    return toDate;
  }

  public void setToDate(Date toDate) {
    this.toDate = toDate;
    this.hasToDate = true;
  }

  public String getReason() {
    return reason;

  }

  public void setReason(String reason) {
    this.reason = reason;
    this.hasreason = true;
  }

  public Employee getEmp() {
    return emp;
  }

  public void setEmp(Employee empid) {
    this.emp = empid;
    this.hasempid = true;
  }

  public Absences(Date fromDate, Date toDate, int count, String reason, Employee empid) {
    super();
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.count = count;
    this.reason = reason;
    this.emp = empid;
  }

  public boolean hasFromDate() {
    return hasFromDate;
  }

  public boolean hasToDate() {
    return hasToDate;
  }

  public boolean hasreason() {
    return hasreason;
  }

  public boolean hasempid() {
    return hasempid;
  }

  public void setCount(int count) {
    this.count = count;
  }

}
