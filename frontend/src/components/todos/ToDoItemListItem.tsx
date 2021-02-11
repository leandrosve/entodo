import { Button, Checkbox, CheckboxProps, Stack, Text } from "@chakra-ui/react";
import React, { FC, useCallback, useState } from "react";

import EditIcon from "@ant-design/icons/EditOutlined";
import DeleteIcon from "@ant-design/icons/DeleteOutlined";
import ToDoItem from "../../types/ToDoItem";
import Api from "../../api/api";

interface ToDoItemListItemProps {
  toDoItem: ToDoItem;
  handleEditToDoItem: (item: ToDoItem) => void;
  handleRemoveToDoItem: (id:number) => void;
  handleOpenEditForm:(item: ToDoItem) => void;
}

interface CustomCheckboxProps extends CheckboxProps {
  isLoading?: boolean;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ isLoading, ...props }) =>
  isLoading ? <Button isDisabled isLoading /> : <Checkbox {...props} />;

const ToDoItemListItem: FC<ToDoItemListItemProps> = ({
  toDoItem,
  handleEditToDoItem,
  handleOpenEditForm,
  handleRemoveToDoItem
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleItemStatus = useCallback(() => {
    setIsLoading(true);
    Api.post<ToDoItem, undefined>(
      `/todos/${toDoItem.id}/${toDoItem.state == "ACT" ? "complete" : "start"}`
    ).then((res) => {
      handleEditToDoItem(res.data);
      setIsLoading(false);
    }).catch();
  }, [toDoItem, setIsLoading]);

  const deleteItem = useCallback(() => {
    Api.delete<ToDoItem>(
      `/todos/${toDoItem.id}`
    ).then((res) => handleRemoveToDoItem(res.data.id)).catch();
  }, [toDoItem, setIsLoading]);

  return (
    <Stack
      m="5px"
      flexDir={{ md: "row", base: "column" }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack spacing={5} isInline alignItems="center">
        <CustomCheckbox
          onClick={toggleItemStatus}
          isLoading={isLoading}
          isChecked={toDoItem.state === "COM"}
          flexShrink={0}
          colorScheme="brand"
          size="lg"
        />
        <Text m="10px">{toDoItem.title}</Text>
      </Stack>
      <div>
      <Button
        flexShrink={0}
        m="5px"
        w={{ md: "auto", base: "100%" }}
        onClick={()=>handleOpenEditForm(toDoItem)}
        leftIcon={<EditIcon />}
        colorScheme="purple"
      >
        Edit
      </Button>
      <Button
        flexShrink={0}
        m="5px"
        w={{ md: "auto", base: "100%" }}
        onClick={deleteItem}
        leftIcon={<DeleteIcon />}
      >
        Remove
      </Button>
      </div>
    </Stack>
  );
};

export default ToDoItemListItem;
