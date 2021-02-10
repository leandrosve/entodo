package com.leandrosve.entodo.exception;

public class ErrorResponse {
    private Integer status;
    private String message;

    public Integer getStatus(){
        return status;
    }

    public String getMessage() {
        return message;
    }

    public ErrorResponse(Integer status, String message) {
        this.message = message;
        this.status = status;
    }

}
