package com.cognizant.EMS.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(value = ResourceNotFoundException.class)
  public ResponseEntity<String> resourceNotFound(ResourceNotFoundException ex) {
    return new ResponseEntity<String>("No Policy Details are not found in the database", HttpStatus.CONFLICT);
  }

}
