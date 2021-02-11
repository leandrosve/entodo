import { List, ListItem } from "@chakra-ui/react";
import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
  return (
      <List spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <ListItem key={i}>
            <ToDoItem />
          </ListItem>
        ))}
      </List>
  );
};

export default ToDoList;
