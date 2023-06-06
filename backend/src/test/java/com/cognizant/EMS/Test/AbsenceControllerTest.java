package com.cognizant.EMS.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.cognizant.EMS.Exception.ResourceNotFoundException;
import com.cognizant.EMS.controller.AbsencesController;
import com.cognizant.EMS.entity.Absences;
import com.cognizant.EMS.entity.Employee;
import com.cognizant.EMS.service.AbsencesService;
import com.cognizant.EMS.service.EmployeeService;

@SpringBootTest
@AutoConfigureMockMvc
public class AbsenceControllerTest {

  @InjectMocks
  private AbsencesController absencesController;

  @Mock
  private AbsencesService absencesService;

  @Mock
  private EmployeeService employeeService;

  @Mock
  private MockMvc mockMvc;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testGetAllAbsences() throws Exception {
    // Mocking data
    List<Absences> absencesList = new ArrayList<>();
    absencesList.add(new Absences());
    when(absencesService.getAllAbsences()).thenReturn(absencesList);

    // Perform GET request
    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/absences")
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    // Verify the response
    assertEquals(HttpStatus.OK.value(), mvcResult.getResponse().getStatus());
    verify(absencesService, times(1)).getAllAbsences();
  }

  @Test
  public void testGetAllAbsencesByEmpId() throws Exception {
    // Mocking data
    Long empId = 1L;
    List<Absences> absencesList = new ArrayList<>();
    absencesList.add(new Absences());
    when(absencesService.getAbsencesByEmpId(empId)).thenReturn(absencesList);

    // Perform GET request
    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/absences")
        .param("empId", String.valueOf(empId))
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    // Verify the response
    assertEquals(HttpStatus.OK.value(), mvcResult.getResponse().getStatus());
    verify(absencesService, times(1)).getAbsencesByEmpId(empId);
  }

  @Test
  public void testGetAbsencesById() throws Exception {
    // Mocking data
    Long absencesId = 1L;
    Absences absences = new Absences();
    absences.setId(absencesId);
    Optional<Absences> absencesOptional = Optional.of(absences);
    when(absencesService.getAbsencesById(absencesId)).thenReturn(absencesOptional);

    // Perform GET request
    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/absences/{id}", absencesId)
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    // Verify the response
    assertEquals(HttpStatus.OK.value(), mvcResult.getResponse().getStatus());
    verify(absencesService, times(1)).getAbsencesById(absencesId);
  }

  @Test
  public void testGetAbsencesByIdNotFound() throws Exception {
    // Mocking data
    Long absencesId = 1L;
    Optional<Absences> absencesOptional = Optional.empty();
    when(absencesService.getAbsencesById(absencesId)).thenReturn(absencesOptional);

    // Perform GET request
    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/absences/{id}", absencesId)
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    // Verify the response
    assertEquals(HttpStatus.NOT_FOUND.value(), mvcResult.getResponse().getStatus());
    verify(absencesService, times(1)).getAbsencesById(absencesId);
  }

  @Test
  public void testApplyLeave() throws Exception {
    // Mocking data
    Long empId = 1L;
    Employee employee = new Employee();
    employee.setId(empId);
    Absences absences = new Absences();
    absences.setEmp(employee);
    ResponseEntity<Object> responseEntity = new ResponseEntity<>(absences, HttpStatus.CREATED);
    when(employeeService.getEmployee(empId)).thenReturn(employee);
    when(absencesService.createAbsences(absences)).thenReturn(absences);

    // Perform POST request
    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/absences/{id}", empId)
        .content("{\"id\": 1, \"emp\": {\"id\": 1}}")
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    // Verify the response
    assertEquals(HttpStatus.CREATED.value(), mvcResult.getResponse().getStatus());
    verify(employeeService, times(1)).getEmployee(empId);
    verify(absencesService, times(1)).createAbsences(absences);
  }

  @Test
  public void testApplyLeaveInvalidEmpId() throws Exception {
    // Mocking data
    Long empId = 1L;
    when(employeeService.getEmployee(empId)).thenReturn(null);

    // Perform POST request
    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/absences/{id}", empId)
        .content("{\"id\": 1, \"emp\": {\"id\": 1}}")
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    // Verify the response
    assertEquals(HttpStatus.BAD_REQUEST.value(), mvcResult.getResponse().getStatus());
    verify(employeeService, times(1)).getEmployee(empId);
    verify(absencesService, never()).createAbsences(any(Absences.class));
  }

  @Test
  public void testUpdateAbsences() throws Exception {
    // Mocking data
    Long absencesId = 1L;
    Absences absences = new Absences();
    absences.setId(absencesId);
    when(absencesService.getAbsencesById(absencesId)).thenReturn(Optional.of(absences));
    when(absencesService.updateAbsences(absencesId, absences)).thenReturn(absences);

    // Perform PUT request
    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put("/absences/{id}", absencesId)
        .content("{\"id\": 1}")
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    // Verify the response
    assertEquals(HttpStatus.OK.value(), mvcResult.getResponse().getStatus());
    verify(absencesService, times(1)).getAbsencesById(absencesId);
    verify(absencesService, times(1)).updateAbsences(absencesId, absences);
  }

  @Test
  public void testUpdateAbsencesNotFound() throws Exception {
    // Mocking data
    Long absencesId = 1L;
    when(absencesService.getAbsencesById(absencesId)).thenReturn(Optional.empty());

    // Perform PUT request
    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.put("/absences/{id}", absencesId)
        .content("{\"id\": 1}")
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    // Verify the response
    assertEquals(HttpStatus.NOT_FOUND.value(), mvcResult.getResponse().getStatus());
    verify(absencesService, times(1)).getAbsencesById(absencesId);
    verify(absencesService, never()).updateAbsences(anyLong(), any(Absences.class));
  }

  @Test
  public void testDeleteAbsencesById() throws Exception {
    // Mocking data
    Long absencesId = 1L;
    when(absencesService.deleteAbsences(absencesId)).thenReturn(true);

    // Perform DELETE request
    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete("/absences/{id}", absencesId)
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    // Verify the response
    assertEquals(HttpStatus.OK.value(), mvcResult.getResponse().getStatus());
    verify(absencesService, times(1)).deleteAbsences(absencesId);
  }
}
