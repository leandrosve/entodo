import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { FC, useCallback, useState } from "react";
import * as Yup from "yup";
import ToDoItem from "../../types/ToDoItem";
import TextField from "../util/TextField";
import TextIcon from "@ant-design/icons/FileTextOutlined";
import Api from "../../api/api";
import Alert from "../util/Alert";
interface ToDoItemData {
  title: string;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("This field is required")
    .max(256, "Title is too long"),
});

interface ToDoItemEditFormProps {
  toDoItem: ToDoItem;
  handleEditToDoItem: (item: ToDoItem) => void;
}
const ToDoItemEditForm: FC<ToDoItemEditFormProps> = ({
  toDoItem,
  handleEditToDoItem,
}) => {
  const initialValues: ToDoItemData = { title: "" };

  const [error, setError] = useState<string | undefined>();

  const editItem = useCallback(
    (newData: ToDoItemData) => {
      Api.patch<ToDoItem, ToDoItem>(`/todos/${toDoItem.id}`, {
        ...toDoItem,
        ...newData,
      })
        .then((res) => {
          handleEditToDoItem(res.data);
        })
        .catch((err) => setError(err.message));
    },
    [toDoItem, setError]
  );

  return (
    <Flex flexDir="column">
      <Heading as="h3" size="lg" mb="10px">
        Editing Task <i>"Task name</i>"
      </Heading>
      {error && (
        <Alert status="error" handleClose={() => setError(undefined)}>
          {error}
        </Alert>
      )}
      <Formik
        validateOnChange
        validateOnMount
        initialValues={{title:toDoItem.title}}
        validationSchema={validationSchema}
        onSubmit={(values: ToDoItemData) => {
          editItem(values);
        }}
      >
        {(formik) => (
          <Form>
            <TextField
              name="title"
              type="text"
              inputLeftElement={<TextIcon />}
              placeholder="Title"
            />
            <Stack isInline mt="10px" justifyContent="flex-end">
              <Button isDisabled={!formik.isValid} colorScheme="brand" type="submit">
                Save
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default ToDoItemEditForm;
