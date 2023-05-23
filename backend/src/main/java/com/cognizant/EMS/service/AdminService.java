package com.cognizant.EMS.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.EMS.entity.Admin;
import com.cognizant.EMS.repository.AdminRepository;

@Service
public class AdminService {

  @Autowired
  private AdminRepository adminRepository;

  public List<Admin> getAllAdmin() {
    return adminRepository.findAll();
  }

  public Admin createAdmin(Admin admin) {

    return adminRepository.save(admin);
  }

  public Admin getAdmin(Long id) {
    return adminRepository.findById(id).orElse(null);

  }

  public Admin updateAdmin(Long id, Admin updatedAdmin) {
    Admin admin = adminRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));

    if (updatedAdmin.hasFirstName()) {
      admin.setFirstName(updatedAdmin.getFirstName());
    }
    if (updatedAdmin.hasLastName()) {
      admin.setLastName(updatedAdmin.getLastName());
    }
    if (updatedAdmin.hasAge()) {
      admin.setAge(updatedAdmin.getAge());
    }
    if (updatedAdmin.hasMobileNumber()) {
      admin.setMobileNumber(updatedAdmin.getMobileNumber());
    }
    if (updatedAdmin.hasAddress()) {
      admin.setAddress(updatedAdmin.getAddress());
    }
    if (updatedAdmin.hasEmailId()) {
      admin.setEmailId(updatedAdmin.getEmailId());
    }
    if (updatedAdmin.hasJoinDate()) {
      admin.setJoinDate(updatedAdmin.getJoinDate());
    }

    return adminRepository.save(admin);
  }

  public void deleteAdmin(Long id) {
    Admin admin = adminRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
    adminRepository.delete(admin);
  }

  public Admin getAdminByEmailId(String emailId) {

    return adminRepository.getByEmailId(emailId);
  }

}
