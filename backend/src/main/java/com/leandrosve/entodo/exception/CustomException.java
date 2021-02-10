package com.leandrosve.entodo.exception;

import org.springframework.http.HttpStatus;

public abstract class CustomException extends RuntimeException {

    public abstract String getMessage();

    public abstract HttpStatus getHttpStatus();

}
