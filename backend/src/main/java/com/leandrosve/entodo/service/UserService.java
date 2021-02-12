package com.leandrosve.entodo.service;

import com.leandrosve.entodo.exception.UsernameAlreadyExistsException;
import com.leandrosve.entodo.model.User;
import com.leandrosve.entodo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService  implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        if (usernameAlreadyExists(user.getUsername())) throw new UsernameAlreadyExistsException();
        user.setPassword(encryptPassword(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) throw new UsernameNotFoundException("User not found in the system.");
        return user;
    }

    private boolean usernameAlreadyExists(String username) {
        return userRepository.existsByUsername(username);
    }

    private String encryptPassword(String password){
        return passwordEncoder.encode(password);
    }
}
