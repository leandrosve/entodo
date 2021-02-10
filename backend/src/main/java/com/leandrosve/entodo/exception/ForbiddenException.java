package com.leandrosve.entodo.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends CustomException{
    @Override
    public String getMessage() {
        return "{forbidden}";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FORBIDDEN;
    }
}
