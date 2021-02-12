package com.leandrosve.entodo.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends CustomException{
    @Override
    public String getMessage() {
        return "The requested resource does not belong to you.";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FORBIDDEN;
    }
}
