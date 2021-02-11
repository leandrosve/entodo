import { Badge, Box, Container, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import ToDoItemForm from "./ToDoItemForm";
import ToDoItemEditForm from "./ToDoItemEditForm";
import ToDoList from "./ToDoList";
import ToDoItem from "../../types/ToDoItem";
import Api from "../../api/api";
import Alert from "../util/Alert";
import Modal from "../layout/Modal";  
import useToDoItemStats from "../hooks/useToDoItemStats";

interface ToDoListModuleProps {
  folderId?: number;
  title?: string;
}
const ToDoListModule: FC<ToDoListModuleProps> = ({ folderId, title }) => {
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const {completed, active} = useToDoItemStats(toDoItems);
  const [editForm, setEditForm] = useState<{
    open: boolean;
    item: ToDoItem | undefined;
  }>({ open: false, item: undefined });

  const handleAddToDoItem = useCallback(
    (item: ToDoItem) => {
      setToDoItems((prev) => [item, ...prev]);
      setSuccess("Task added!")
    },
    [setToDoItems, setSuccess]
  );

  const handleRemoveToDoItem = useCallback(
    (id: number) => {
      setToDoItems((prev) => prev.filter(item => item.id !== id));
      setSuccess("Task succesfully removed");
    },
    [setToDoItems, setSuccess]
  );

  useEffect(() => {
    const endpoint=folderId == null? "/todos/unfolded" : `/folders/${folderId}/todos`
    Api.get<ToDoItem[]>(endpoint)
      .then((res) => setToDoItems(res.data.reverse()))
      .catch((err) => setError(err.message));
  }, [folderId]);

  const handleEditToDoItem = useCallback(
    (item: ToDoItem) => {
      setToDoItems((prev) => prev.map((t) => (t.id != item.id ? t : item)));
      setEditForm(prev=>{
        if(prev.open) setSuccess("Saved changes!")
        return { open: false, item: undefined }
      })
    },
    [setToDoItems, setEditForm, setSuccess]
  );

  const handleOpenEditForm = (item: ToDoItem) => {
    setEditForm({ open: true, item });
  };

  const handleCloseEditForm = () => {
    setEditForm({ open: false, item: undefined });
  };

  return (
    <Container
      display="flex"
      flexDir="column"
      maxW="600px"
      justifyContent="start"
    >
      {title && (
        <Heading align="left" size="lg">
          
          {title}
          {"  "}
        </Heading>
      )}
      <Flex justifyContent="start" mb="10px">
          <Badge ml="1" fontSize="0.9em" colorScheme="purple">{toDoItems.length} tasks</Badge>
          <Badge ml="1" fontSize="0.9em" colorScheme="green">COMPLETED:{completed}</Badge>
          <Badge ml="1" fontSize="0.9em" colorScheme="yellow">ACTIVE:{active}</Badge>
        </Flex>
     
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
      <Box maxH="60vh" overflow="hidden" overflowY="scroll">
      <ToDoList
        toDoItems={toDoItems}
        handleOpenEditForm={handleOpenEditForm}
        handleEditToDoItem={handleEditToDoItem}
        handleRemoveToDoItem={handleRemoveToDoItem}
      />
      </Box>
      <ToDoItemForm folderId={folderId} handleAddToDoItem={handleAddToDoItem} />
      {editForm.item && (
        <Modal isOpen={editForm.open} onClose={handleCloseEditForm}>
          <ToDoItemEditForm toDoItem={editForm.item} handleEditToDoItem={handleEditToDoItem} />
        </Modal>
      )}
    </Container>
  );
};

export default ToDoListModule;
