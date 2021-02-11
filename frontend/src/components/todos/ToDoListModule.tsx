import { Container, Heading, List, ListItem } from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import ToDoItemForm from "./ToDoItemForm";
import ToDoItemEditForm from "./ToDoItemEditForm";
import ToDoList from "./ToDoList";
import ToDoItem from "../../types/ToDoItem";
import Api from "../../api/api";
import Alert from "../util/Alert";

interface ToDoListModuleProps{
  folderId?:number,
}
const ToDoListModule:FC<ToDoListModuleProps> = ({folderId}) => {
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const handleAddToDoItem = useCallback(()=>{
    
  },[toDoItems])
  useEffect(()=>{
    if(folderId == null) return;
    Api.get<ToDoItem[]>(`/folders/${folderId}/todos`).then((res)=>setToDoItems(res.data))
    .catch(err => setError(err.message))
  },[folderId])

  return (
    <Container display="flex" flexDir="column" maxW="600px" justifyContent="center">
      <Heading>To-Do List</Heading>
      {error && (
        <Alert status="error" handleClose={() => setError(undefined)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert status="success" handleClose={() => setSuccess(undefined)}>
          {success}
        </Alert>
      )}
      <ToDoList toDoItems={toDoItems}/>

      <ToDoItemForm folderId={folderId} handleAddToDoItem={handleAddToDoItem}/>

      <ToDoItemEditForm/>
    </Container>
  );
};

export default ToDoListModule;
