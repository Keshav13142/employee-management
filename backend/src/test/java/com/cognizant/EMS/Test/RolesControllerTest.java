package com.cognizant.EMS.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.cognizant.EMS.Exception.ResourceNotFoundException;
import com.cognizant.EMS.controller.RolesController;
import com.cognizant.EMS.entity.Roles;
import com.cognizant.EMS.service.RolesService;

public class RolesControllerTest {
  @Mock
  private RolesService rolesService;

  @InjectMocks
  private RolesController rolesController;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testGetAllRoles() {
    List<Roles> rolesList = new ArrayList<>();
    rolesList.add(new Roles(1L, "Role1", 10000));
    rolesList.add(new Roles(2L, "Role2", 20000));
    rolesList.add(new Roles(3L, "Role3", 30000));

    when(rolesService.getAllRoles()).thenReturn(rolesList);

    List<Roles> result = rolesController.getAllRoles();

    assertEquals(3, result.size());
    verify(rolesService, times(1)).getAllRoles();
  }

  @Test
  public void testGetRolesById() {
    Long roleId = 1L;
    Roles role = new Roles(roleId, "Role1", 10000);

    when(rolesService.getRolesById(roleId)).thenReturn(Optional.of(role));

    Optional<Roles> result = rolesController.getRolesById(roleId);

    assertEquals(roleId, result.get().getId());
    assertEquals("Role1", result.get().getRole());
    assertEquals(10000, result.get().getSalary());
    verify(rolesService, times(1)).getRolesById(roleId);
  }

  @Test
  public void testGetRolesById_NotFound() {
    Long roleId = 1L;

    when(rolesService.getRolesById(roleId)).thenReturn(Optional.empty());

    Optional<Roles> result = rolesController.getRolesById(roleId);

    assertEquals(Optional.empty(), result);
    verify(rolesService, times(1)).getRolesById(roleId);
  }

  @Test
  public void testCreateRoles() {
    Roles role = new Roles(1L, "Role1", 10000);

    when(rolesService.createRoles(role)).thenReturn(role);

    Roles result = rolesController.createRoles(role);

    assertEquals(1L, result.getId());
    assertEquals("Role1", result.getRole());
    assertEquals(10000, result.getSalary());
    verify(rolesService, times(1)).createRoles(role);
  }

  @Test
  public void testUpdateRoles() throws ResourceNotFoundException {
    Long roleId = 1L;
    Roles role = new Roles(roleId, "Role1", 10000);
    Roles updatedRole = new Roles(roleId, "Updated Role", 20000);

    when(rolesService.getRolesById(roleId)).thenReturn(Optional.of(role));
    when(rolesService.updateRoleById(roleId, updatedRole.getRole(), updatedRole.getSalary())).thenReturn(updatedRole);

    Roles result = rolesService.updateRoleById(roleId, updatedRole.getRole(), updatedRole.getSalary());

    assertEquals(roleId, result.getId());
    assertEquals("Updated Role", result.getRole());
    assertEquals(20000, result.getSalary());
    verify(rolesService, times(1)).getRolesById(roleId);
    verify(rolesService, times(1)).updateRoleById(roleId, updatedRole.getRole(), updatedRole.getSalary());
  }

  @Test
  public void testUpdateRoles_NotFound() {
    Long roleId = 1L;
    Roles updatedRole = new Roles(roleId, "Updated Role", 20000);

    when(rolesService.getRolesById(roleId)).thenReturn(Optional.empty());

    rolesController.updateRoleById(roleId, updatedRole);

    verify(rolesService, times(1)).getRolesById(roleId);
  }

  @Test
  public void testDeleteRolesById() throws ResourceNotFoundException {
    Long roleId = 1L;
    Roles role = new Roles(roleId, "Role1", 10000);

    when(rolesService.getRolesById(roleId)).thenReturn(Optional.of(role));
    when(rolesService.deleteRoles(roleId)).thenReturn(true);

    boolean result = rolesController.deleteRolesById(roleId);

    assertEquals(true, result);
    verify(rolesService, times(1)).getRolesById(roleId);
    verify(rolesService, times(1)).deleteRoles(roleId);
  }

  @Test
  public void testDeleteRolesById_NotFound() {
    Long roleId = 1L;

    when(rolesService.getRolesById(roleId)).thenReturn(Optional.empty());

    try {
      rolesController.deleteRolesById(roleId);
    } catch (ResourceNotFoundException e) {
      assertEquals("Role data doesn't exist", e.getMessage());
    }

    verify(rolesService, times(1)).getRolesById(roleId);
  }
}
