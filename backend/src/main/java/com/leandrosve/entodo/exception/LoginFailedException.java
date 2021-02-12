package com.leandrosve.entodo.exception;

import org.springframework.http.HttpStatus;

public class LoginFailedException extends CustomException{
    @Override
    public String getMessage() {
        return "Username and password do not match.";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.UNAUTHORIZED;
    }
}
