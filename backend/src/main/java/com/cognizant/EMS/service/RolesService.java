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

  public Roles updateRoleById(Long id, String role, double salary) {
    Roles db_role = rolesRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Role not found"));
    db_role.setRole(role);
    db_role.setSalary(salary);
    rolesRepository.save(db_role);
    return db_role;
  }

  public boolean deleteRoles(Long id) {
    rolesRepository.deleteById(id);
    return false;
  }

}
