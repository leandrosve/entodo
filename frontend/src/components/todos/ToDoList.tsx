import { Container, Heading, List, ListItem } from "@chakra-ui/react";
import React from "react";
import ToDoItem from "./ToDoItem";
import ToDoItemForm from "./ToDoItemForm";
import ToDoItemEditForm from "./ToDoItemEditForm";

const ToDoList = () => {
  return (
    <Container display="flex" flexDir="column" justifyContent="center">
      <Heading>To-Do List</Heading>

      {[1, 2, 3, 4].map((i) => (
        <List key={i} spacing={3}>
          <ListItem>
            <ToDoItem />
          </ListItem>
        </List>
      ))}

      <ToDoItemForm/>

      <ToDoItemEditForm/>
    </Container>
  );
};

export default ToDoList;
