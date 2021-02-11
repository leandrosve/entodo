package com.leandrosve.entodo.repository;

import com.leandrosve.entodo.model.ToDoItem;
import com.leandrosve.entodo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long> {
    @Query("SELECT t FROM ToDoItem t WHERE t.user= :user AND t.folder= NULL")
    List<ToDoItem> findAllUnfoldedFromUser(@Param("user") User user);
}
