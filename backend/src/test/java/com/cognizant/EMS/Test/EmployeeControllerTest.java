package com.cognizant.EMS.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cognizant.EMS.Exception.ResourceNotFoundException;
import com.cognizant.EMS.controller.EmployeeController;
import com.cognizant.EMS.entity.Employee;
import com.cognizant.EMS.service.EmployeeService;

public class EmployeeControllerTest {
	
	@Mock
    private EmployeeService employeeService;

    @InjectMocks
    private EmployeeController employeeController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    @Test
    void testGetAllEmployees() {
        // Arrange
        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee());
        employees.add(new Employee());

        when(employeeService.getAllEmployees()).thenReturn(employees);

        // Act
        ResponseEntity<List<Employee>> response = employeeController.getAllEmployees();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(employees, response.getBody());
        verify(employeeService, times(1)).getAllEmployees();
    }
    
    @Test
    void testGetEmployeeById_ExistingId() throws ResourceNotFoundException {
        // Arrange
        long id = 1L;
        Employee employee = new Employee();

        when(employeeService.getEmployee(id)).thenReturn(employee);

        // Act
        ResponseEntity<Employee> response = employeeController.getEmployeeById(id);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(employee, response.getBody());
        verify(employeeService, times(1)).getEmployee(id);
    }
    
    @Test
    void testGetEmployeeById_NonExistingId() throws ResourceNotFoundException {
        // Arrange
        long id = 1L;

        when(employeeService.getEmployee(id)).thenReturn(null);

        // Act & Assert
        ResourceNotFoundException exception = org.junit.jupiter.api.Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            employeeController.getEmployeeById(id);
        });

        assertEquals("Employee not found", exception.getMessage());
        verify(employeeService, times(1)).getEmployee(id);
    }

    @Test
    void testCreateEmployee() {
        // Arrange
        Employee employee = new Employee();

        when(employeeService.createEmployee(employee)).thenReturn(employee);

        // Act
        ResponseEntity<Employee> response = employeeController.createEmployee(employee);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(employee, response.getBody());
        verify(employeeService, times(1)).createEmployee(employee);
    }

    @Test
    void testUpdateEmployee_ExistingId() throws ResourceNotFoundException {
        // Arrange
        long id = 1L;
        Employee updatedEmployee = new Employee();

        when(employeeService.updateEmployee(id, updatedEmployee)).thenReturn(updatedEmployee);

        // Act
        ResponseEntity<Employee> response = employeeController.updateEmployee(id, updatedEmployee);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedEmployee, response.getBody());
        verify(employeeService, times(1)).updateEmployee(id, updatedEmployee);
    }

    @Test
    void testUpdateEmployee_NonExistingId() throws ResourceNotFoundException {
        // Arrange
        long id = 1L;
        Employee updatedEmployee = new Employee();

        when(employeeService.updateEmployee(id, updatedEmployee)).thenThrow(ResourceNotFoundException.class);

        // Act & Assert
        ResourceNotFoundException exception = org.junit.jupiter.api.Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            employeeController.updateEmployee(id, updatedEmployee);
        });

        assertEquals("Employee not found", exception.getMessage());
        verify(employeeService, times(1)).updateEmployee(id, updatedEmployee);
    }

    @Test
    void testDeleteEmployee_ExistingId() throws ResourceNotFoundException {
        // Arrange
        long id = 1L;

        // Act
        ResponseEntity<Void> response = employeeController.deleteEmployee(id);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(employeeService, times(1)).deleteEmployee(id);
    }

    @Test
    void testDeleteEmployee_NonExistingId() throws ResourceNotFoundException {
        // Arrange
        long id = 1L;

        doThrow(ResourceNotFoundException.class).when(employeeService).deleteEmployee(id);

        // Act & Assert
        ResourceNotFoundException exception = org.junit.jupiter.api.Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            employeeController.deleteEmployee(id);
        });

        assertEquals("Employee not found", exception.getMessage());
        verify(employeeService, times(1)).deleteEmployee(id);
    }
}

