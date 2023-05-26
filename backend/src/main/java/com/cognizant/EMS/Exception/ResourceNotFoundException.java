package com.cognizant.EMS.Exception;

public class ResourceNotFoundException extends Exception {

  public ResourceNotFoundException(String message) {
    super(message);
  }

  public ResourceNotFoundException() {
    super();
  }

  public ResourceNotFoundException(String message, Exception e) {
    super(message, e);
  }
}
