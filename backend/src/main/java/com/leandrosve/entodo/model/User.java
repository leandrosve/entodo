package com.leandrosve.entodo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private long id;

    @NotBlank
    @Size(min=3, message="The given username is too short.")

    @Size(max=256, message="The given username is too long.")
    @Pattern(regexp = "^\\S+$", message="The username can not have spaces.")
    @Column(unique = true)
    private String username;

    @NotBlank(message="Your name is required.")
    @Size(max=256, message="Your name is way too long.")
    private String name;

    @NotBlank(message="The password is required.")
    @Size(min=3, message="The given password is too short.")
    @Pattern(regexp ="^(?=.*\\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$", message="The given password is too insecure.")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @OneToMany(mappedBy="user", fetch = FetchType.LAZY)

    @JsonIgnore
    private List<Folder> folders = new ArrayList<>();

    @OneToMany(mappedBy="user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ToDoItem> toDoItems = new ArrayList<>();

    public List<ToDoItem> getToDoItems() {
        return toDoItems;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Folder> getFolders() {
        return folders;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
