package com.cognizant.EMS.Exception;

public class ResourceNotFoundException extends Exception {

  private String message;

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
