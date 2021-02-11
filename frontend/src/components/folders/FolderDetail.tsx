import { Heading, Stack } from "@chakra-ui/react";
import React, { FC } from "react";
import ToDoList from "../todos/ToDoList";

interface FolderProps{
    id:number;
    title:string;
    description:string;
    toDoItems:[]
}

const FolderDetail:FC<FolderProps> = (folder) => {
  return (<Stack align="center">
      <Heading textAlign="left" width="100%">Folders <strong>➤</strong> {folder.title} </Heading>
      <ToDoList/>
    
  </Stack>)
};

export default FolderDetail;
