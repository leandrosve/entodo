package com.leandrosve.entodo.exception.handler;

import org.springframework.http.HttpStatus;

public class UsernameAlreadyExistsException extends CustomException {

    @Override
    public String getMessage() {
        return "{username.alreadyExists}";
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }

}
