package com.leandrosve.entodo.controller;

import com.leandrosve.entodo.model.Folder;
import com.leandrosve.entodo.model.User;
import com.leandrosve.entodo.model.dto.FolderDTO;
import com.leandrosve.entodo.service.AuthenticationService;
import com.leandrosve.entodo.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
public class FolderController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private FolderService folderService;

    @GetMapping("/folders")
    public ResponseEntity<List<Folder>> getFolders() {
        User user = authenticationService.getCurrentUser();
        List<Folder> folders = folderService.getFoldersFromUser(user);
        return new ResponseEntity<>(folders, HttpStatus.OK);
    }

    @GetMapping("/folders/{folderId}")
    public ResponseEntity<FolderDTO> getFolder(@PathVariable Long folderId) {
        User user = authenticationService.getCurrentUser();
        Folder folder = folderService.getFolderByIdAndUser(folderId, user);
        return new ResponseEntity<>( FolderService.mapFolderToDTO(folder), HttpStatus.OK);
    }

    @PostMapping("/folders")
    public ResponseEntity<FolderDTO> createFolder(@RequestBody @Valid Folder folder) {
        User user = authenticationService.getCurrentUser();
        Folder res = folderService.createFolderForUser(folder, user);
        return new ResponseEntity<>(FolderService.mapFolderToDTO(res), HttpStatus.OK);
    }

    @DeleteMapping("/folders/{folderId}")
    public ResponseEntity<Folder> deleteFolder(@PathVariable Long folderId) {
        User user = authenticationService.getCurrentUser();
        return new ResponseEntity<>(folderService.deleteFolderFromUser(folderId, user), HttpStatus.OK);
    }

    @PatchMapping("/folders/{folderId}")
    public ResponseEntity<FolderDTO> editFolder(@RequestBody @Valid Folder folderInfo, @PathVariable Long folderId) {
        User user = authenticationService.getCurrentUser();
        Folder res = folderService.editFolderFromUser(folderId, folderInfo, user);
        return new ResponseEntity<>(FolderService.mapFolderToDTO(res), HttpStatus.OK);
    }

}
