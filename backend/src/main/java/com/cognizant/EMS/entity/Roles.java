package com.cognizant.EMS.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
public class Roles {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "role")
  private String role;
  @Transient
  private boolean hasrole = false;

  @Column(name = "salary")
  private double salary;
  @Transient
  private boolean hassalary = false;

  @Override
  public String toString() {
    return "Roles [id=" + id + ", role=" + role + ", salary=" + salary + "]";
  }

  public Long getId() {
    return this.id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
    this.hasrole = true;
  }

  public double getSalary() {
    return salary;
  }

  public void setSalary(double salary) {
    this.salary = salary;
    this.hassalary = true;
  }

  public Roles(long id, String role, double salary) {
    super();
    this.id = id;
    this.role = role;
    this.salary = salary;
  }

  public boolean hasrole() {
    return hasrole;
  }

  public boolean hassalary() {
    return hassalary;
  }

}
