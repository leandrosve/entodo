package com.leandrosve.entodo.repository;

import com.leandrosve.entodo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    public boolean existsByUsername(String username);
}