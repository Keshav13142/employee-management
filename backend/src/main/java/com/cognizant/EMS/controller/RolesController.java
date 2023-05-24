package com.cognizant.EMS.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cognizant.EMS.Exception.ResourceNotFoundException;
import com.cognizant.EMS.entity.Roles;
import com.cognizant.EMS.service.RolesService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/role")
@CrossOrigin("*")
@Slf4j
public class RolesController {

  @Autowired
  private RolesService rolesService;

  @GetMapping
  public List<Roles> getAllRoles() {
    log.info("Successfully fetched the details of roles");
    return rolesService.getAllRoles();
  }

  @GetMapping("/{id}")
  public Optional<Roles> getRolesById(@PathVariable Long id) {
    log.info("Successfully fetched the details of the role id");
    return rolesService.getRolesById(id);
  }

  @PostMapping
  public Roles createRoles(@RequestBody Roles roles) {
    log.info("Successfully created the roles data");
    return rolesService.createRoles(roles);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updateRoleById(@PathVariable Long id, @RequestBody Roles role) {
    rolesService.updateRoleById(id, role.getRole());
    return ResponseEntity.ok().build();

  }

  @DeleteMapping("/{id}")
  public boolean deleteRolesById(@PathVariable Long id) throws ResourceNotFoundException {
    Optional<Roles> obj = rolesService.getRolesById(id);
    if (obj != null) {
      log.info("Successfully updated the detail of roles");
      return rolesService.deleteRoles(id);
    } else {
      throw new ResourceNotFoundException("Role data doesn't exist");
    }
  }

}
