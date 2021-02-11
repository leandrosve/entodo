import { Container, Heading, List, ListItem } from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import ToDoItemForm from "./ToDoItemForm";
import ToDoItemEditForm from "./ToDoItemEditForm";
import ToDoList from "./ToDoList";
import ToDoItem from "../../types/ToDoItem";
import Api from "../../api/api";
import Alert from "../util/Alert";
import Modal from "../layout/Modal";

interface ToDoListModuleProps {
  folderId?: number;
  title?: string;
}
const ToDoListModule: FC<ToDoListModuleProps> = ({ folderId, title }) => {
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [editForm, setEditForm] = useState<{
    open: boolean;
    item: ToDoItem | undefined;
  }>({ open: false, item: undefined });

  const handleAddToDoItem = useCallback(
    (item: ToDoItem) => {
      setToDoItems((prev) => [item, ...prev]);
    },
    [setToDoItems]
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
      .then((res) => setToDoItems(res.data))
      .catch((err) => setError(err.message));
  }, [folderId]);

  const handleEditToDoItem = useCallback(
    (item: ToDoItem) => {
      setToDoItems((prev) => prev.map((t) => (t.id != item.id ? t : item)));
    },
    [setToDoItems]
  );

  const handleOpenEditForm = (item: ToDoItem) => {
    setEditForm({ open: true, item });
  };

  const handleCloseEditForm = () => {
    setEditForm({ open: true, item: undefined });
  };

  return (
    <Container
      display="flex"
      flexDir="column"
      maxW="600px"
      justifyContent="center"
    >
      {title && (
        <Heading w="100%" align="left" size="lg">
          {title}
        </Heading>
      )}
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
      <ToDoList
        toDoItems={toDoItems}
        handleOpenEditForm={handleOpenEditForm}
        handleEditToDoItem={handleEditToDoItem}
        handleRemoveToDoItem={handleRemoveToDoItem}
      />
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
