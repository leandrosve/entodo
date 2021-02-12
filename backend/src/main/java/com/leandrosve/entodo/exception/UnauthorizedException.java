package com.leandrosve.entodo.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends CustomException{
    @Override
    public String getMessage() {
        return "You don't have the required authorities.";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.UNAUTHORIZED;
    }
}
