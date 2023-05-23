package com.cognizant.EMS.entity;

import java.util.Date;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "absences")
@Getter
@Setter
@NoArgsConstructor
public class Absences {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "fromdate", nullable = false)
  private Date FromDate;
  @Transient
  private boolean hasFromDate = false;

  @Column(name = "todate", nullable = false)
  private Date ToDate;
  @Transient
  private boolean hasToDate = false;

  // @Column(name = "count")
  private int count;

  @Column(name = "reason")
  private String reason;
  @Transient
  private boolean hasreason = false;

  @OneToOne
  @JoinColumn(name = "empid", nullable = false)
  private Employee emp;
  @Transient
  private boolean hasempid = false;

  @Override
  public String toString() {
    return "absences [FromDate=" + FromDate + ", ToDate=" + ToDate + ", reason=" + reason + ", empid=" + emp
        + "]";
  }

  public Date getFromDate() {
    return FromDate;
  }

  public void setFromDate(Date fromDate) {
    FromDate = fromDate;
    this.hasFromDate = true;
  }

  public Date getToDate() {
    return ToDate;
  }

  public void setToDate(Date toDate) {
    ToDate = toDate;
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
    FromDate = fromDate;
    ToDate = toDate;
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
