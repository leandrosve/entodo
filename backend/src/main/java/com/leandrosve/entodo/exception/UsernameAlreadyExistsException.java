package com.leandrosve.entodo.exception;

import org.springframework.http.HttpStatus;

public class UsernameAlreadyExistsException extends CustomException {

    @Override
    public String getMessage() {
        return "Username is already taken";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }

}
