package com.leandrosve.entodo.exception.handler;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class EntodoResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
        ex.printStackTrace();
        final HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        ErrorResponse exceptionResponse = new ErrorResponse(status.value(), request.getDescription(false));

        return new ResponseEntity<Object>(exceptionResponse, status);
    }

    @ExceptionHandler(CustomException.class)
    public final ResponseEntity<Object> handleCustomExceptions(CustomException ex) {

        ErrorResponse error = new ErrorResponse(ex.getHttpStatus().value(), ex.getMessage());

        return new ResponseEntity(error, ex.getHttpStatus());
    }


    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<String> details = new ArrayList<>();
        for(ObjectError error : ex.getBindingResult().getAllErrors()) {
            details.add(error.getDefaultMessage());
        }
        ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), details.get(0));

        return new ResponseEntity(error, HttpStatus.BAD_REQUEST);
    }
}