package com.leandrosve.entodo.service;

import com.leandrosve.entodo.exception.LoginFailedException;
import com.leandrosve.entodo.exception.UnauthorizedException;
import com.leandrosve.entodo.model.User;
import com.leandrosve.entodo.model.dto.AuthenticatedCredentials;
import com.leandrosve.entodo.repository.UserRepository;
import com.leandrosve.entodo.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private UserRepository userRepository;

    private AuthenticationManager authenticationManager;

    private JwtUtil jwtUtil;

    public AuthenticationService(@Autowired UserRepository userRepository, @Autowired AuthenticationManager authenticationManager, @Autowired JwtUtil jwtUtil){
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public AuthenticatedCredentials authenticateUser(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }catch (BadCredentialsException e){
            throw new LoginFailedException();
        }
        User user = userRepository.findByUsername(username);
        String jwt = jwtUtil.generateToken(user);
        AuthenticatedCredentials credentials = new AuthenticatedCredentials(user, jwt);
        return credentials;
    }

    private Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public User getCurrentUser() throws UnauthorizedException {
        Authentication authentication = getAuthentication();
        if(authentication == null) throw new UnauthorizedException();
        User user =  userRepository.findByUsername(authentication.getName());
        if(user == null) throw new UnauthorizedException();
        return user;
    }
}
