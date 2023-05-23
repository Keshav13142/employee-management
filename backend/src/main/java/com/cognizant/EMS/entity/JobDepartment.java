package com.cognizant.EMS.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "job_department")
@Getter
@Setter
@NoArgsConstructor
public class JobDepartment {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "dept_name")
  private String deptName;
  @Transient
  private boolean hasDeptName = false;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDeptName() {
    return deptName;
  }

  public void setDeptName(String deptName) {
    this.deptName = deptName;
    this.hasDeptName = true;
  }

  @Override
  public String toString() {
    return "JobDepartment [id=" + id + ", deptName=" + deptName + "]";
  }

  public boolean hasDeptName() {
    return hasDeptName;
  }

}
