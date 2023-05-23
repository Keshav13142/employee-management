package com.cognizant.EMS.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.EMS.entity.Roles;
import com.cognizant.EMS.repository.RolesRepository;

@Service
public class RolesService {

  @Autowired
  private RolesRepository rolesRepository;

  public List<Roles> getAllRoles() {
    return rolesRepository.findAll();
  }

  public Optional<Roles> getRolesById(long id) {
    return rolesRepository.findById(id);
  }

  public Roles createRoles(Roles roles) {
    return rolesRepository.save(roles);
  }

  public Roles updateRoles(Long id, Roles updatedRoles) {
    Roles role = rolesRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Employee not found"));
    if (updatedRoles.hasrole()) {
      updatedRoles.setRole(updatedRoles.getRole());
    }

    if (updatedRoles.hassalary()) {
      role.setSalary(updatedRoles.getSalary());
    }
    return rolesRepository.save(role);
  }

  public boolean deleteRoles(Long id) {
    rolesRepository.deleteById(id);
    return false;
  }

}
