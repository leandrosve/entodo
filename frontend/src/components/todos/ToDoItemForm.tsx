import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { FC, useCallback, useState } from "react";
import * as Yup from "yup";
import TextField from "../util/TextField";
import TextIcon from "@ant-design/icons/FileTextOutlined";
import AddIcon from "@ant-design/icons/PlusOutlined";
import Api from "../../api/api";
import ToDoItem from "../../types/ToDoItem";

interface ToDoItemData {
  title: string;
  folderId?:number;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(256, "Title is too long"),
});

interface Props {
  folderId?: number;
  handleAddToDoItem:(item:ToDoItem)=>void;
}
const ToDoItemForm: FC<Props> = ({ folderId, handleAddToDoItem}) => {
  const initialValues: ToDoItemData = { title: "" };

  const [error, setError] = useState<string | undefined>();

  const createToDoItem = useCallback((data:ToDoItemData, handleResetForm:()=>void)=>{
    Api.post<ToDoItem, ToDoItemData>("/todos", {...data, folderId}).then(
      res=>{handleAddToDoItem(res.data);handleResetForm()}
    ).catch(
      err=>setError(err.message)
    )
  },[folderId])
  return (
    <Formik
      validateOnChange
      validateOnMount
      isInitialValid={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: ToDoItemData, {resetForm}) => {
        createToDoItem(values, resetForm)
      }}
    >
      {(formik) => (
        <Form>
          <Stack isInline mt="10px">
            <TextField
              inputLeftElement={<TextIcon />}
              name="title"
              type="text"
              placeholder="New task"
            />

            <Button
              type="submit"
              isDisabled={!formik.isValid}
              leftIcon={<AddIcon />}
            >
              Add
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ToDoItemForm;
