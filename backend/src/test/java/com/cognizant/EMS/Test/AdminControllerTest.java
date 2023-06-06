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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cognizant.EMS.Exception.ResourceNotFoundException;
import com.cognizant.EMS.controller.AdminController;
import com.cognizant.EMS.entity.Admin;
import com.cognizant.EMS.service.AdminService;

public class AdminControllerTest {

    @Mock
    private AdminService adminService;

    @InjectMocks
    private AdminController adminController;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllAdmin() {
        List<Admin> adminList = new ArrayList<>();
        adminList.add(new Admin());
        adminList.add(new Admin());
        adminList.add(new Admin());

        when(adminService.getAllAdmin()).thenReturn(adminList);

        ResponseEntity<List<Admin>> result = adminController.getAllAdmin();

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(3, result.getBody().size());
        verify(adminService, times(1)).getAllAdmin();
    }

    @Test
    public void testGetAdminById() throws ResourceNotFoundException {
        Long adminId = 1L;
        Admin admin = new Admin();

        when(adminService.getAdmin(adminId)).thenReturn(admin);

        ResponseEntity<Admin> result = adminController.getAdminById(adminId);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(adminId, result.getBody().getId(adminId));
        assertEquals("John Doe", result.getBody().getFirstName());
        verify(adminService, times(1)).getAdmin(adminId);
    }

    @Test
    public void testGetAdminById_NotFound() throws ResourceNotFoundException {
        Long adminId = 1L;

        when(adminService.getAdmin(adminId)).thenReturn(null);

        try {
            adminController.getAdminById(adminId);
        } catch (ResourceNotFoundException e) {
            assertEquals("Admin not found", e.getMessage());
        }

        verify(adminService, times(1)).getAdmin(adminId);
    }

    @Test
    public void testCreateAdmin() {
        Admin admin = new Admin();

        when(adminService.createAdmin(admin)).thenReturn(admin);

        ResponseEntity<Admin> result = adminController.createAdmin(admin);

        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertEquals(1L, result.getBody().getAge());
        assertEquals("John Doe", result.getBody().getFirstName());
        verify(adminService, times(1)).createAdmin(admin);
    }

    @Test
    public void testUpdateAdmin() throws ResourceNotFoundException {
        Long adminId = 1L;
        Admin admin = new Admin();
        Admin updatedAdmin = new Admin();

        when(adminService.updateAdmin(adminId, updatedAdmin)).thenReturn(updatedAdmin);

        ResponseEntity<Admin> result = adminController.updateAdmin(adminId, updatedAdmin);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(adminId, result.getBody().getEmailId());
        assertEquals("Updated Admin", result.getBody().getFirstName());
        verify(adminService, times(1)).updateAdmin(adminId, updatedAdmin);
    }

    @Test
    public void testUpdateAdmin_NotFound() {
        Long adminId = 1L;
        Admin updatedAdmin = new Admin();

        when(adminService.updateAdmin(adminId, updatedAdmin)).thenReturn(null);

        try {
            adminController.updateAdmin(adminId, updatedAdmin);
        } catch (ResourceNotFoundException e) {
            assertEquals("There is no admin data in this id", e.getMessage());
        }

        verify(adminService, times(1)).updateAdmin(adminId, updatedAdmin);
    }

    @Test
    public void testDeleteAdmin() {
        Long adminId = 1L;

        ResponseEntity<Void> result = adminController.deleteAdmin(adminId);

        assertEquals(HttpStatus.NO_CONTENT, result.getStatusCode());
        verify(adminService, times(1)).deleteAdmin(adminId);
    }
}

