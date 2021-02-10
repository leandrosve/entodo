package com.leandrosve.entodo.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends CustomException{
    @Override
    public String getMessage() {
        return "{unauthorized}";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.UNAUTHORIZED;
    }
}
