package com.leandrosve.entodo.controller;

import com.leandrosve.entodo.model.dto.AuthenticatedCredentials;
import com.leandrosve.entodo.model.dto.LoginRequest;
import com.leandrosve.entodo.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class AuthenticationController {

    private AuthenticationService authenticationService;

    public AuthenticationController(@Autowired AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) {
        AuthenticatedCredentials credentials = authenticationService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
        return new ResponseEntity<>(credentials, HttpStatus.OK);
    }

}
