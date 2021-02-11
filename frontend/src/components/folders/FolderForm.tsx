import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { FC, useCallback, useState } from "react";
import * as Yup from "yup";
import TextField from "../util/TextField";
import TextIcon from "@ant-design/icons/FileTextOutlined";
import AddIcon from "@ant-design/icons/PlusOutlined";

import FolderIcon from "@ant-design/icons/FolderFilled";
import Api from "../../api/api";
import Folder from "../../types/Folder";
import Alert from "../util/Alert";

interface FolderData {
  title: string;
  description?: string;
}

interface FolderFormProps {
  handleAddFolder: (folder: Folder) => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(256, "Title is too long"),
  description: Yup.string().max(256, "Title is too long"),
});

const FolderForm: FC<FolderFormProps> = ({ handleAddFolder }) => {
  const initialValues: FolderData = { title: "" };

  const [error, setError] = useState<string | undefined>();

  const createFolder = useCallback(
    (folderData: FolderData, handleResetForm: () => void) => {
      Api.post<Folder, FolderData>("/folders", folderData)
        .then((res) => {
          handleAddFolder(res.data);
          handleResetForm();
        })
        .catch((err) => setError(err.message));
    },
    [setError, handleAddFolder]
  );

  return (
    <Formik
      validateOnChange
      validateOnMount
      isInitialValid={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: FolderData, helpers) => {
        createFolder(values, helpers.resetForm);
      }}
    >
      {(formik) => (
        <Form>
          <Stack mt="10px">
            {error && (
              <Alert status="error" handleClose={() => setError(undefined)}>
                {error}
              </Alert>
            )}
            <TextField
              inputLeftElement={<FolderIcon />}
              name="title"
              type="text"
              placeholder="New Folder"
            />

            <TextField
              inputLeftElement={<TextIcon />}
              name="description"
              type="text"
              placeholder="Description"
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

export default FolderForm;
