package com.leandrosve.entodo.service;

import com.leandrosve.entodo.exception.handler.UsernameAlreadyExistsException;
import com.leandrosve.entodo.model.User;
import com.leandrosve.entodo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(  @Autowired UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        if(usernameAlreadyExists(user.getUsername())) throw new UsernameAlreadyExistsException();
        return userRepository.save(user);
    }

    private boolean usernameAlreadyExists(String username){
        return userRepository.existsByUsername(username);
    }

}
