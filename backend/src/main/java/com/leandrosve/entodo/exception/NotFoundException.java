package com.leandrosve.entodo.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends CustomException {

    private String message;

    public NotFoundException(String message) {
        this.message = message;
    }

    public NotFoundException() {
        super();
    }

    @Override
    public String getMessage() {
        if(message == null)
            return "Couldn't find the requested resource.";
        return message;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }
}
