//package com.cognizant.EMS.Test;
//
//import com.cognizant.EMS.Exception.ResourceNotFoundException;
//import com.cognizant.EMS.controller.TrainingSlotController;
//import com.cognizant.EMS.entity.TrainingSlot;
//import com.cognizant.EMS.service.TrainingSlotService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//import static org.mockito.Mockito.*;
//
//public class TrainingSlotControllerTest {
//    @Mock
//    private TrainingSlotService trainingslotService;
//
//    @InjectMocks
//    private TrainingSlotController trainingslotController;
//
//    @BeforeEach
//    public void init() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testGetAllTrainingSlot() {
//        List<TrainingSlot> trainingSlotList = List.of(
//        );
//
//        when(trainingslotService.getAllTrainingSlot()).thenReturn(trainingSlotList);
//
//        List<TrainingSlot> result = trainingslotController.getAllTrainingSlot();
//
//        assertEquals(2, result.size());
//        verify(trainingslotService, times(1)).getAllTrainingSlot();
//    }
//
//    @Test
//    public void testGetTrainingSlotById() throws ResourceNotFoundException {
//        Long trainingSlotId = 1L;
//        TrainingSlot trainingSlot = new TrainingSlot();
//
//        when(trainingslotService.getTrainingSlotById(trainingSlotId)).thenReturn(Optional.of(trainingSlot));
//
//        Optional<TrainingSlot> result = trainingslotController.getTrainingSlotById(trainingSlotId);
//
//        assertTrue(result.isPresent());
//        assertEquals(trainingSlotId, result.get().getId());
//        assertEquals("Slot1", result.get().getcourseName());
//        verify(trainingslotService, times(1)).getTrainingSlotById(trainingSlotId);
//    }
//
//    @Test
//    public void testGetTrainingSlotById_ResourceNotFoundException() {
//        Long trainingSlotId = 1L;
//
//        when(trainingslotService.getTrainingSlotById(trainingSlotId)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            trainingslotController.getTrainingSlotById(trainingSlotId);
//        });
//
//        verify(trainingslotService, times(1)).getTrainingSlotById(trainingSlotId);
//    }
//
//    @Test
//    public void testCreateTrainingSlot() throws ResourceNotFoundException {
//        TrainingSlot trainingSlot = new TrainingSlot();
//
//        when(trainingslotService.createTrainingSlot(trainingSlot)).thenReturn(trainingSlot);
//
//        ResponseEntity<TrainingSlot> response = trainingslotController.deleteTrainingSlot(trainingSlot);
//
//        assertEquals(HttpStatus.CREATED, response.getStatusCode());
//        assertEquals(trainingSlot, response.getBody());
//        verify(trainingslotService, times(1)).createTrainingSlot(trainingSlot);
//    }
//
//    @Test
//    public void testUpdateTrainingSlot() throws ResourceNotFoundException {
//        Long trainingSlotId = 1L;
//        TrainingSlot trainingSlot = new TrainingSlot();
//        TrainingSlot updatedTrainingSlot = new TrainingSlot();
//
//        when(trainingslotService.getTrainingSlotById(trainingSlotId)).thenReturn(Optional.of(trainingSlot));
//        when(trainingslotService.updateTrainingSlot(trainingSlotId, updatedTrainingSlot)).thenReturn(updatedTrainingSlot);
//
//        ResponseEntity<TrainingSlot> response = trainingslotController.updateTrainingSlot(trainingSlotId, updatedTrainingSlot);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(updatedTrainingSlot, response.getBody());
//        verify(trainingslotService, times(1)).getTrainingSlotById(trainingSlotId);
//        verify(trainingslotService, times(1)).updateTrainingSlot(trainingSlotId, updatedTrainingSlot);
//    }
//
//    @Test
//    public void testUpdateTrainingSlot_ResourceNotFoundException() {
//        Long trainingSlotId = 1L;
//        TrainingSlot updatedTrainingSlot = new TrainingSlot();
//
//        when(trainingslotService.getTrainingSlotById(trainingSlotId)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            trainingslotController.updateTrainingSlot(trainingSlotId, updatedTrainingSlot);
//        });
//
//        verify(trainingslotService, times(1)).getTrainingSlotById(trainingSlotId);
//        verify(trainingslotService, never()).updateTrainingSlot(anyLong(), any(TrainingSlot.class));
//    }
//
//    @Test
//    public void testDeleteTrainingSlot() throws ResourceNotFoundException {
//        Long trainingSlotId = 1L;
//
//        when(trainingslotService.getTrainingSlotById(trainingSlotId)).thenReturn(Optional.of(new TrainingSlot()));
//
//        ResponseEntity<Void> response = trainingslotController.deleteTrainingSlot(trainingSlotId);
//
//        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
//        verify(trainingslotService, times(1)).getTrainingSlotById(trainingSlotId);
//        verify(trainingslotService, times(1)).deleteTrainingSlot(trainingSlotId);
//    }
//
//    @Test
//    public void testDeleteTrainingSlot_ResourceNotFoundException() {
//        Long trainingSlotId = 1L;
//
//        when(trainingslotService.getTrainingSlotById(trainingSlotId)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            trainingslotController.deleteTrainingSlot(trainingSlotId);
//        });
//
//        verify(trainingslotService, times(1)).getTrainingSlotById(trainingSlotId);
//        verify(trainingslotService, never()).deleteTrainingSlot(anyLong());
//    }
//}
