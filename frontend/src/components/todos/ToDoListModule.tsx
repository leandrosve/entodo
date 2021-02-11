import { Container, Heading, List, ListItem } from "@chakra-ui/react";
import React from "react";
import ToDoItem from "./ToDoItem";
import ToDoItemForm from "./ToDoItemForm";
import ToDoItemEditForm from "./ToDoItemEditForm";
import ToDoList from "./ToDoList";

const ToDoListModule = () => {
  return (
    <Container display="flex" flexDir="column" maxW="600px" justifyContent="center">
      <Heading>To-Do List</Heading>

      <ToDoList/>

      <ToDoItemForm/>

      <ToDoItemEditForm/>
    </Container>
  );
};

export default ToDoListModule;
