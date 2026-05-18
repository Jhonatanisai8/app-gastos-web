package com.isai.backend.common.exception;

import com.isai.backend.common.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiResponse<Void>> handleResourceNotFound(ResourceNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(ApiResponse.error(404, ex.getMessage()));
  }

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<ApiResponse<Void>> handleBadRequest(BadRequestException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(ApiResponse.error(400, ex.getMessage()));
  }

  @ExceptionHandler(UnauthorizedException.class)
  public ResponseEntity<ApiResponse<Void>> handleUnauthorized(UnauthorizedException ex) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(ApiResponse.error(401, ex.getMessage()));
  }

  @ExceptionHandler(DuplicateResourceException.class)
  public ResponseEntity<ApiResponse<Void>> handleDuplicate(DuplicateResourceException ex) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(ApiResponse.error(409, ex.getMessage()));
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ApiResponse<Void>> handleAccessDenied(AccessDeniedException ex) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN)
        .body(ApiResponse.error(403, "Access denied"));
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<ApiResponse<Void>> handleAuthentication(AuthenticationException ex) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(ApiResponse.error(401, "Authentication failed"));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(MethodArgumentNotValidException ex) {
    Map<String, String> errors = ex.getBindingResult().getFieldErrors().stream()
        .collect(Collectors.toMap(
            FieldError::getField,
            error -> error.getDefaultMessage() != null ? error.getDefaultMessage() : "Invalid value",
            (a, b) -> a));
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(ApiResponse.<Map<String, String>>builder()
            .status(400)
            .message("Validation error")
            .data(errors)
            .timestamp(java.time.LocalDateTime.now())
            .build());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse<Void>> handleGeneral(Exception ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ApiResponse.error(500, "Internal server error"));
  }
}
