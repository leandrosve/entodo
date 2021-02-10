package com.leandrosve.entodo.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class ToDoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private long id;

    @Size(max = 256, message = "{title.tooLong}")
    @NotBlank(message = "{title.required}")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    private User user;

    @JsonIgnore
    @Enumerated(EnumType.STRING)
    private ToDoItemState state;

    public ToDoItem() {
        super();
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Folder folder;

    public ToDoItem(@Size(max = 256, message = "{title.tooLong}") @NotBlank(message = "{title.required}") String title, User user, Folder folder) {
        this.title = title;
        this.user = user;
        this.folder = folder;
    }

    public ToDoItemState getState() {
        return state;
    }

    public void setState(ToDoItemState state) {
        this.state = state;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Folder getFolder() {
        return folder;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }
}
