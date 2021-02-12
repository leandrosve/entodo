package com.leandrosve.entodo.model.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginRequest {

    @NotBlank
    @Size(min=3, message="Invalid username.")
    @Size(max=256, message="Invalid username.")
    private String username;

    @NotBlank
    @Size(min=3, message="Invalid credentials.")
    @Size(max=256, message="Invalid credentials.")
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