import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import UserIcon from "@ant-design/icons/UserOutlined";
import KeyIcon from "@ant-design/icons/KeyOutlined";
import React from "react";
import { Form, Formik } from "formik";

import * as Yup from "yup";
import TextField from "../util/TextField";

interface LoginValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(""),
});

const LoginForm = () => {
  const initialValues: LoginValues = { username: "", password: "" };

  return (
    <Container>
      <Heading textAlign="center" as="h2" size="lg">
        Log in
      </Heading>
      <Formik
        validateOnChange
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(values);
        }}
      >
        {(formik) => (
          <Form>
            <Stack spacing={4} mt="4">
            <TextField
                inputLeftElement={<UserIcon/>}
                name="username"
                type="text"
                placeholder="Username"
              />
              <TextField
                name="password"
                type="password"
                inputLeftElement={<KeyIcon />}
                placeholder="Password"
              />
              <Button
                mt={4}
                colorScheme="brand"
                type="submit"
                isFullWidth
                disabled={!formik.isValid}
              >
                Log in
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
