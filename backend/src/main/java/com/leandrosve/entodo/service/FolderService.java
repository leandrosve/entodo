package com.leandrosve.entodo.service;

import com.leandrosve.entodo.exception.ForbiddenException;
import com.leandrosve.entodo.exception.NotFoundException;
import com.leandrosve.entodo.model.Folder;
import com.leandrosve.entodo.model.User;
import com.leandrosve.entodo.repository.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {

    @Autowired
    private FolderRepository folderRepository;

    public List<Folder> getFoldersFromUser(User user){
        return user.getFolders();
    }

    public Folder createFolderForUser(Folder folder, User user){
        folder.setUser(user);
        return folderRepository.save(folder);
    }

    public Folder deleteFolderFromUser(Long folderId, User user){
        Folder folder = findFolderByIdAndUser(folderId, user);
        folderRepository.delete(folder);
        return folder;
    }

    public Folder editFolderFromUser(Long folderId, Folder folderInfo, User user){
        Folder folder = findFolderByIdAndUser(folderId, user);
        folder.setTitle(folderInfo.getTitle());
        folder.setDescription(folderInfo.getDescription());
        return folderRepository.save(folder);
    }

    private Folder findFolderByIdAndUser(Long folderId, User user) throws NotFoundException, ForbiddenException{
        Folder folder =  folderRepository.findById(folderId).orElseThrow(()->new NotFoundException("{folder.notFound}"));
        if(!folder.getUser().equals(user)) throw new ForbiddenException();
        return folder;
    }
}
