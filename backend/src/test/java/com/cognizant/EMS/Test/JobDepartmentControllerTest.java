package com.cognizant.EMS.Test;

import com.cognizant.EMS.Exception.ResourceNotFoundException;
import com.cognizant.EMS.controller.JobDepartmentController;
import com.cognizant.EMS.entity.JobDepartment;
import com.cognizant.EMS.service.JobDepartmentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class JobDepartmentControllerTest {
  @Mock
  private JobDepartmentService jobDepartmentService;

  @InjectMocks
  private JobDepartmentController jobDepartmentController;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testGetAllJobDepartment() {
    // Mocking data
    List<JobDepartment> jobDepartments = new ArrayList<>();
    jobDepartments.add(new JobDepartment());
    jobDepartments.add(new JobDepartment());

    when(jobDepartmentService.getAllJobDepartment()).thenReturn(jobDepartments);

    // Call the controller method
    List<JobDepartment> result = jobDepartmentController.getAllJobDepartment();

    // Verify the response
    assertEquals(jobDepartments.size(), result.size());
    assertThat(result).containsExactlyElementsOf(jobDepartments);
  }

  @Test
  void testGetJobDepartmentById() throws ResourceNotFoundException {
    // Mocking data
    long departmentId = 1L;
    JobDepartment jobDepartment = new JobDepartment();
    Optional<JobDepartment> optionalJobDepartment = Optional.of(jobDepartment);

    when(jobDepartmentService.getJobDepartmentById(departmentId)).thenReturn(optionalJobDepartment);

    // Call the controller method
    Optional<JobDepartment> result = jobDepartmentController.getJobDepartmentById(departmentId);

    // Verify the response
    assertThat(result).isPresent();
    assertEquals(jobDepartment, result.get());
  }

  @Test
  void testCreateJobDepartment() {
    // Mocking data
    JobDepartment jobDepartment = new JobDepartment();

    when(jobDepartmentService.createJobDepartment(any(JobDepartment.class))).thenReturn(jobDepartment);

    // Call the controller method
    JobDepartment result = jobDepartmentController.createJobDepartment(jobDepartment);

    // Verify the response
    assertThat(result).isEqualTo(jobDepartment);
  }

  @Test
  void testUpdateJobDepartment() throws ResourceNotFoundException {
    // Mocking data
    long departmentId = 1L;
    JobDepartment existingJobDepartment = new JobDepartment();
    JobDepartment updatedJobDepartment = new JobDepartment();

    when(jobDepartmentService.getJobDepartmentById(departmentId)).thenReturn(Optional.of(existingJobDepartment));
    when(jobDepartmentService.updateJobDepartment(departmentId,
        updatedJobDepartment.getDeptName())).thenReturn(updatedJobDepartment);

    // Call the controller method
    jobDepartmentController.updateJobDepartment(departmentId,
        updatedJobDepartment);

    if (jobDepartmentService.getJobDepartmentById(departmentId).isPresent()) {
      // Verify the response
      assertThat(jobDepartmentService.getJobDepartmentById(departmentId).get()).isEqualTo(updatedJobDepartment);
    }
  }

  @Test
  void testUpdateJobDepartment_ThrowsResourceNotFoundException() {
    // Mocking data
    long departmentId = 1L;
    JobDepartment updatedJobDepartment = new JobDepartment();

    when(jobDepartmentService.getJobDepartmentById(departmentId)).thenReturn(Optional.empty());

    // Call the controller method and verify that it throws
    // ResourceNotFoundException
    ResourceNotFoundException exception = org.junit.jupiter.api.Assertions.assertThrows(
        ResourceNotFoundException.class,
        () -> jobDepartmentController.updateJobDepartment(departmentId, updatedJobDepartment));

    // Verify the exception message
    assertEquals("The Department detail is not found", exception.getMessage());
  }

  @Test
  void testDeleteJobDepartmentById() throws ResourceNotFoundException {
    // Mocking data
    long departmentId = 1L;
    JobDepartment jobDepartment = new JobDepartment();

    when(jobDepartmentService.getJobDepartmentById(departmentId)).thenReturn(Optional.of(jobDepartment));
    when(jobDepartmentService.deleteJobDepartment(departmentId)).thenReturn(true);

    // Call the controller method
    boolean result = jobDepartmentController.deleteJobDepartmentById(departmentId);

    // Verify the response
    assertThat(result).isTrue();
  }

  @Test
  void testDeleteJobDepartmentById_ThrowsResourceNotFoundException() {
    // Mocking data
    long departmentId = 1L;

    when(jobDepartmentService.getJobDepartmentById(departmentId)).thenReturn(Optional.empty());

    // Call the controller method and verify that it throws
    // ResourceNotFoundException
    ResourceNotFoundException exception = org.junit.jupiter.api.Assertions.assertThrows(
        ResourceNotFoundException.class,
        () -> jobDepartmentController.deleteJobDepartmentById(departmentId));

    // Verify the exception message
    assertEquals("The department doesn't exist", exception.getMessage());
  }
}
