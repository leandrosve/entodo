package com.leandrosve.entodo.model.dto;

import com.leandrosve.entodo.model.ToDoItem;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

import com.leandrosve.entodo.model.ToDoItem;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

public class FolderDTO implements Serializable {

    private Long id;

    private String title;

    private String description;

    public FolderDTO() {
        super();
    }

    public FolderDTO(Long id, String title, String description, List<ToDoItemDTO> toDoItems) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.toDoItems = toDoItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ToDoItemDTO> getToDoItems() {
        return toDoItems;
    }

    public void setToDoItems(List<ToDoItemDTO> toDoItems) {
        this.toDoItems = toDoItems;
    }

    private List<ToDoItemDTO> toDoItems;

}
