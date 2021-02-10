package com.leandrosve.entodo.model.dto;

import com.leandrosve.entodo.model.ToDoItem;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

public class ToDoItemDTO implements Serializable {
    private Long id;
    @Size(max = 256, message = "{title.tooLong}")
    @NotBlank(message = "{title.required}")
    private String title;

    private String state;

    private Long folderId;

    public ToDoItemDTO() {
       super();
    }

    public ToDoItemDTO(ToDoItem toDoItem) {
        this.id= toDoItem.getId();
        this.title = toDoItem.getTitle();
        if(toDoItem.getFolder() != null)
            this.folderId=toDoItem.getFolder().getId();
        this.state=toDoItem.getState().toString();
    }

    public Long getId() {
        return id;
    }


    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
    public String getTitle() {
        return title;
    }

    public Long getFolderId() {
        return folderId;
    }

}
