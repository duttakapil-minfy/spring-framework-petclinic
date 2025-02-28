package org.springframework.samples.petclinic.rest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;

/**
 * Global exception handler for REST controllers
 */
@ControllerAdvice("org.springframework.samples.petclinic.rest")
public class RestControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { IllegalArgumentException.class, IllegalStateException.class })
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
        String message = ex.getMessage();
        Map<String, String> errors = new HashMap<>();
        errors.put("error", message);
        
        return handleExceptionInternal(ex, errors, 
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
    
    @ExceptionHandler(value = { ConstraintViolationException.class })
    protected ResponseEntity<Object> handleValidationErrors(ConstraintViolationException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", "Validation Error");
        errors.put("message", ex.getMessage());
        
        return handleExceptionInternal(ex, errors,
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}