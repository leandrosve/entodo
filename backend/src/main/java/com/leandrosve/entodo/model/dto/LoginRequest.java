package com.leandrosve.entodo.model.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginRequest {

    @NotBlank
    @Size(min=3, message="{username.short}")
    @Size(max=256, message="{username.tooLong}")
    private String username;

    @NotBlank
    @Size(min=3, message="{password.short}")
    @Size(max=256, message="{password.tooLong}")
    private String password;

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
    public LoginRequest() {
        super();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}