package com.leandrosve.entodo.model.dto;

import com.leandrosve.entodo.model.User;

public class AuthenticatedCredentials {

    private final String jwt;

    private User user;

    public AuthenticatedCredentials(User user, String jwt) {
        this.jwt = jwt;
        this.user= user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getJwt() {
        return jwt;
    }

}