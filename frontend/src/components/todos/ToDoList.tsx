import { List, ListItem, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import ToDoItem from "../../types/ToDoItem";
import ToDoItemListItem from "./ToDoItemListItem";

interface ToDoListProps{
  toDoItems?:ToDoItem[];
}
const ToDoList:FC<ToDoListProps>= ({toDoItems=[]}) => {
  return (
      <>
      <Text size="xl"></Text>
      <List spacing={3}>
        {toDoItems.map((toDoItem) => (
          <ListItem key={toDoItem.id}>
            <ToDoItemListItem toDoItem={toDoItem}/>
          </ListItem>
        ))}
      </List>
      </>
  );
};

export default ToDoList;
