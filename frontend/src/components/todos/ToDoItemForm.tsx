import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import TextField from "../util/TextField";
import TextIcon from "@ant-design/icons/FileTextOutlined";
import AddIcon from "@ant-design/icons/PlusOutlined";

interface ToDoItemValues {
  title: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required").max(256, "Title is too long"),
});

const ToDoItemForm = () => {
  const initialValues: ToDoItemValues = { title: "" };
  return (
   
      <Formik
        validateOnChange
        validateOnMount
        isInitialValid={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: ToDoItemValues) => {
          alert(JSON.stringify(values));
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

            <Button type="submit" isDisabled={!formik.isValid} leftIcon={<AddIcon/>}>Add</Button>
            </Stack>
          </Form>
        )}
      </Formik>
  );
};

export default ToDoItemForm;
