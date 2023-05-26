package com.cognizant.EMS.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "admin")
public class Admin {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "first_name")
  private String firstName;
  @JsonIgnore
  @Transient
  private boolean hasFirstName = false;

  @Column(name = "last_name", nullable = false)
  private String lastName;
  @JsonIgnore
  @Transient
  private boolean hasLastName = false;

  @Column(name = "age")
  private int age;
  @JsonIgnore
  @Transient
  private boolean hasAge = false;

  @Column(name = "mobile_number", unique = true, nullable = false)
  private String mobileNumber;
  @JsonIgnore
  @Transient
  private boolean hasMobileNumber = false;

  @Column(name = "address")
  private String address;
  @JsonIgnore
  @Transient
  private boolean hasAddress = false;

  @Column(name = "email_id", unique = true, nullable = false)
  private String emailId;
  @JsonIgnore
  @Transient
  private boolean hasEmailId = false;

  @Column(name = "join_date")
  private String joinDate;
  @JsonIgnore
  @Transient
  private boolean hasJoinDate = false;

  @ManyToOne
  @JoinColumn(name = "job_id", nullable = false)
  private JobDepartment jobid;
  @JsonIgnore
  @Transient
  private boolean hasjobDepartment;

  @ManyToOne
  @JoinColumn(name = "role_id", nullable = false)
  private Roles role;
  @JsonIgnore
  @Transient
  private boolean hasRole;

  public long getId(Long id) {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
    this.hasFirstName = true;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
    this.hasLastName = true;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
    this.hasAge = true;
  }

  public String getMobileNumber() {
    return mobileNumber;
  }

  public void setMobileNumber(String mobileNumber) {
    this.mobileNumber = mobileNumber;
    this.hasMobileNumber = true;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
    this.hasAddress = true;
  }

  public String getEmailId() {
    return emailId;
  }

  public void setEmailId(String emailId) {
    this.emailId = emailId;
    this.hasEmailId = true;
  }

  public String getJoinDate() {
    return joinDate;
  }

  public void setJoinDate(String joinDate) {
    this.joinDate = joinDate;
  }

  public JobDepartment getJobid() {
    return jobid;
  }

  public void setJobid(JobDepartment jobid) {
    this.jobid = jobid;
  }

  public Roles getRole() {
    return role;
  }

  public void setRole(Roles role) {
    this.role = role;
  }

  @Override
  public String toString() {
    return "Admin [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", age=" + age
        + ", mobileNumber=" + mobileNumber + ", address=" + address + ", emailId=" + emailId + ", joinDate=" + joinDate
        + ", jobid=" + jobid + ", role=" + role + "]";
  }

  public Admin(Long id, String firstName, String lastName, int age, String mobileNumber, String address,
      String emailId, String joinDate, JobDepartment jobid, Roles role) {
    super();
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.address = address;
    this.emailId = emailId;
    this.joinDate = joinDate;
    this.jobid = jobid;
    this.role = role;
  }

  public Admin() {

  }

  public boolean hasFirstName() {
    return hasFirstName;
  }

  public boolean hasjobDepartment() {
    return hasjobDepartment;
  }

  public boolean hasJoinDate() {
    return hasJoinDate;
  }

  public boolean hasEmailId() {
    return hasEmailId;
  }

  public boolean hasAddress() {
    return hasAddress;
  }

  public boolean hasMobileNumber() {
    return hasMobileNumber;
  }

  public boolean hasAge() {
    return hasAge;
  }

  public boolean hasLastName() {
    return hasLastName;
  }
}
