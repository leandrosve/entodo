import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import TextField from "../util/TextField";

interface ToDoItemValues {
  title: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required("This field is required").max(256, "Title is too long"),
});

const ToDoItemEditForm = () => {
  const initialValues: ToDoItemValues = { title: "" };
  return (
    <Flex flexDir="column">
        <Heading as="h3">Editing Task <i>"Task name</i>"</Heading>
      <Formik
        validateOnChange
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: ToDoItemValues) => {
          alert(JSON.stringify(values));
        }}
      >
        {(formik) => (
          <Form>
              
            <TextField
              name="title"
              type="text"
              defaultValue="poner default value"
            />
            <Stack isInline mt="10px" justifyContent="flex-end">
            <Button colorScheme="brand" type="submit">Save</Button>
            <Button>Cancel</Button>
            </Stack>
          </Form>
        )}
      </Formik>
      </Flex>
  );
};

export default ToDoItemEditForm;
