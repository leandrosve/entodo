import { List, ListItem, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import ToDoItem from "../../types/ToDoItem";
import ToDoItemListItem from "./ToDoItemListItem";

interface ToDoListProps {
  toDoItems?: ToDoItem[];
  handleEditToDoItem: (item: ToDoItem) => void;
  handleOpenEditForm: (item: ToDoItem) => void;
  handleRemoveToDoItem: (id: number) => void;
}
const ToDoList: FC<ToDoListProps> = ({
  toDoItems = [],
  handleEditToDoItem,
  handleOpenEditForm,
  handleRemoveToDoItem,
}) => {
  return (
    <>
      {toDoItems.length == 0 && (
        <Text w="100%" align="left" size="xl">
          You have no tasks yet, start adding one!
        </Text>
      )}
      <List spacing={3}>
        {toDoItems.map((toDoItem) => (
          <ListItem key={toDoItem.id}>
            <ToDoItemListItem
              toDoItem={toDoItem}
              handleRemoveToDoItem={handleRemoveToDoItem}
              handleOpenEditForm={handleOpenEditForm}
              handleEditToDoItem={handleEditToDoItem}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ToDoList;
