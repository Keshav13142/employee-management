package com.cognizant.EMS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cognizant.EMS.Exception.ResourceNotFoundException;
import com.cognizant.EMS.entity.Admin;
import com.cognizant.EMS.service.AdminService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
@Slf4j
public class AdminController {

  @Autowired
  private final AdminService adminService;

  public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  @GetMapping
  public ResponseEntity<List<Admin>> getAllAdmin() {
    List<Admin> admin = adminService.getAllAdmin();
    log.info("Successfully fetched all the admin details");
    return ResponseEntity.ok(admin);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Admin> getAdminById(@PathVariable("id") Long id) throws ResourceNotFoundException {
    Admin admin = adminService.getAdmin(id);
    if (admin != null) {
      log.info("Successfully fetched");
      return ResponseEntity.ok(admin);

    } else {
      throw new ResourceNotFoundException("Admin not found");
    }

  }

  @PostMapping
  public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
    Admin createdAdmin = adminService.createAdmin(admin);
    log.info("Successfully created");
    return ResponseEntity.status(HttpStatus.CREATED).body(createdAdmin);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Admin> updateAdmin(@PathVariable("id") Long id, @RequestBody Admin updatedAdmin)
      throws ResourceNotFoundException {
    Admin admin = adminService.updateAdmin(id, updatedAdmin);

    if (admin != null) {
      log.info("Successfully updated the admin data");
      return ResponseEntity.ok(admin);
    } else {
      throw new ResourceNotFoundException("There is admin data in this id");
    }

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAdmin(@PathVariable("id") Long id) {
    adminService.deleteAdmin(id);
    log.info("Successfully deleted the data");
    return ResponseEntity.noContent().build();
  }

}
