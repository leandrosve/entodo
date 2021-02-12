package com.leandrosve.entodo.service;

import com.leandrosve.entodo.exception.ForbiddenException;
import com.leandrosve.entodo.exception.NotFoundException;
import com.leandrosve.entodo.model.Folder;
import com.leandrosve.entodo.model.ToDoItem;
import com.leandrosve.entodo.model.ToDoItemState;
import com.leandrosve.entodo.model.User;
import com.leandrosve.entodo.model.dto.ToDoItemDTO;
import com.leandrosve.entodo.repository.ToDoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ToDoItemService {

    @Autowired
    private ToDoItemRepository toDoItemRepository;

    @Autowired
    private FolderService folderService;

    public List<ToDoItem> getToDoItemsFromUser(User user){
        return user.getToDoItems();
    }

    public List<ToDoItem> getUnfoldedToDoItemsFromUser(User user){
        return toDoItemRepository.findAllUnfoldedFromUser(user);
    }

    public List<ToDoItem> getToDoItemsFromFolderAndUser(Long folderId, User user){
        Folder folder = folderService.getFolderByIdAndUser(folderId, user);
        return folder.getToDoItems();
    }

    public ToDoItem createToDoItemForUser(ToDoItemDTO toDoItemInfo, User user){
        ToDoItem toDoItem = new ToDoItem(toDoItemInfo.getTitle(), user,null );
        toDoItem.setState(ToDoItemState.ACT);
        if(toDoItemInfo.getFolderId() != null)
            toDoItem.setFolder(folderService.getFolderByIdAndUser(toDoItemInfo.getFolderId(), user));
        return toDoItemRepository.save(toDoItem);
    }

    public ToDoItem getToDoItemByIdAndUser(Long toDoItemId, User user){
        ToDoItem toDoItem =  toDoItemRepository.findById(toDoItemId).orElseThrow(()->new NotFoundException("The task was not found in the system."));
        if(!toDoItem.getUser().equals(user)) throw new ForbiddenException();
        return toDoItem;

    }

    public ToDoItem deleteToDoItemByIdAndUser(Long toDoItemId, User user){
        ToDoItem toDoItem = getToDoItemByIdAndUser(toDoItemId, user);
        toDoItemRepository.delete(toDoItem);
        return toDoItem;
    }

    public ToDoItem editToDoItemFromUser(Long folderId, ToDoItemDTO toDoItemInfo, User user){
        ToDoItem toDoItem = getToDoItemByIdAndUser(folderId, user);
        toDoItem.setTitle(toDoItemInfo.getTitle());
        return toDoItemRepository.save(toDoItem);
    }

    public ToDoItem completeToDoItemFromUser(Long folderId, User user){
        ToDoItem toDoItem = getToDoItemByIdAndUser(folderId, user);
        return  updateToDoItemState(toDoItem, ToDoItemState.COM);
    }

    public ToDoItem startToDoItemFromUser(Long folderId, User user){
        ToDoItem toDoItem = getToDoItemByIdAndUser(folderId, user);
        return  updateToDoItemState(toDoItem, ToDoItemState.ACT);
    }

    private ToDoItem updateToDoItemState(ToDoItem toDoItem, ToDoItemState state){
        toDoItem.setState(state);
        return toDoItemRepository.save(toDoItem);
    }

    public static List<ToDoItemDTO> mapToDoItemsToDTOS(List<ToDoItem> toDoItems){
        List<ToDoItemDTO> toDoItemDTOS = new ArrayList<>();
        toDoItems.forEach((t)->toDoItemDTOS.add(new ToDoItemDTO(t)));
        return toDoItemDTOS;
    }
}
