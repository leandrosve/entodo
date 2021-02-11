package com.leandrosve.entodo.controller;

import com.leandrosve.entodo.model.Folder;
import com.leandrosve.entodo.model.ToDoItem;
import com.leandrosve.entodo.model.User;
import com.leandrosve.entodo.model.dto.FolderDTO;
import com.leandrosve.entodo.model.dto.ToDoItemDTO;
import com.leandrosve.entodo.service.AuthenticationService;
import com.leandrosve.entodo.service.FolderService;
import com.leandrosve.entodo.service.ToDoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.leandrosve.entodo.service.ToDoItemService.mapToDoItemsToDTOS;

@RestController
public class ToDoItemController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ToDoItemService toDoItemService;

    @GetMapping("/todos/{toDoItemId}")
    public ResponseEntity<ToDoItemDTO> getToDoItem(@PathVariable Long toDoItemId) {
        User user = authenticationService.getCurrentUser();
        ToDoItem toDoItem = toDoItemService.getToDoItemByIdAndUser(toDoItemId, user);
        return new ResponseEntity<>(new ToDoItemDTO((toDoItem)), HttpStatus.OK);
    }

    @DeleteMapping("/todos/{toDoItemId}")
    public ResponseEntity<ToDoItemDTO> deleteToDoItem(@PathVariable Long toDoItemId) {
        User user = authenticationService.getCurrentUser();
        ToDoItem toDoItem = toDoItemService.deleteToDoItemByIdAndUser(toDoItemId, user);
        return new ResponseEntity<>(new ToDoItemDTO((toDoItem)), HttpStatus.OK);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<ToDoItemDTO>> getToDoItems() {
        User user = authenticationService.getCurrentUser();
        List<ToDoItem> toDoItems = toDoItemService.getToDoItemsFromUser(user);
        List<ToDoItemDTO> toDoItemDTOS = mapToDoItemsToDTOS(toDoItems);
        return new ResponseEntity<>(toDoItemDTOS, HttpStatus.OK);
    }

    @GetMapping("/todos/unfolded")
    public ResponseEntity<List<ToDoItemDTO>> getToDoItemsWithNoFolder() {
        User user = authenticationService.getCurrentUser();
        List<ToDoItem> toDoItems = toDoItemService.getUnfoldedToDoItemsFromUser(user);
        return new ResponseEntity<>(mapToDoItemsToDTOS(toDoItems), HttpStatus.OK);
    }

    @GetMapping("/folders/{folderId}/todos")
    public ResponseEntity<List<ToDoItemDTO>> getToDoItemsFromFolder(@PathVariable Long folderId) {
        User user = authenticationService.getCurrentUser();
        List<ToDoItem> res = toDoItemService.getToDoItemsFromFolderAndUser(folderId, user);
        return new ResponseEntity<>(mapToDoItemsToDTOS(res), HttpStatus.OK);
    }

    @PostMapping("/todos")
    public ResponseEntity<ToDoItemDTO> createToDoItem(@RequestBody @Valid ToDoItemDTO toDoItemInfo) {
        User user = authenticationService.getCurrentUser();
        ToDoItem toDoItem = toDoItemService.createToDoItemForUser(toDoItemInfo,user);
        return new ResponseEntity<>(new ToDoItemDTO(toDoItem), HttpStatus.OK);
    }

    @PatchMapping("/todos/{todoId}")
    public ResponseEntity<ToDoItemDTO> createToDoItem(@RequestBody @Valid ToDoItemDTO toDoItemInfo, @PathVariable Long todoId) {
        User user = authenticationService.getCurrentUser();
        ToDoItem toDoItem = toDoItemService.editToDoItemFromUser(todoId, toDoItemInfo,user);
        return new ResponseEntity<>(new ToDoItemDTO(toDoItem), HttpStatus.OK);
    }

    @PostMapping("/todos/{toDoItemId}/complete")
    public ResponseEntity<ToDoItemDTO> completeToDoItem( @PathVariable Long toDoItemId) {
        User user = authenticationService.getCurrentUser();
        ToDoItem toDoItem = toDoItemService.completeToDoItemFromUser(toDoItemId ,user);
        return new ResponseEntity<>(new ToDoItemDTO(toDoItem), HttpStatus.OK);
    }

    @PostMapping("/todos/{toDoItemId}/start")
    public ResponseEntity<ToDoItemDTO> startToDoItem( @PathVariable Long toDoItemId) {
        User user = authenticationService.getCurrentUser();
        ToDoItem toDoItem = toDoItemService.startToDoItemFromUser(toDoItemId ,user);
        return new ResponseEntity<>(new ToDoItemDTO(toDoItem), HttpStatus.OK);
    }

}
