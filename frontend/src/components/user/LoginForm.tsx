import { Button, Container, Heading, Stack } from "@chakra-ui/react";
import UserIcon from "@ant-design/icons/UserOutlined";
import KeyIcon from "@ant-design/icons/KeyOutlined";
import React, { useCallback, useContext, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../util/TextField";
import axios from "axios";
import Api from "../../api/api";
import Alert from "../util/Alert";
import AuthContext from "../context/AuthContext";
import AuthInfo from "../../types/AuthInfo";

interface LoginData {
  username: string;
  password: string;
}

const validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(""),
});

const LoginForm = () => {
  const initialValues: LoginData = { username: "", password: "" };

  const [error, setError] = useState<string | undefined>("");

  const { setAuth } = useContext(AuthContext);

  const login = useCallback(
    (data: LoginData) => {
      Api.post<AuthInfo, LoginData>("/login", data)
        .then((res) => setAuth(res.data))
        .catch((err) => setError(err.message));
    },
    [setError, setAuth]
  );

  return (
    <Container>
      <Heading textAlign="center" as="h2" size="lg">
        Log in
      </Heading>
      {error && (
        <Alert status="error" handleClose={() => setError(undefined)}>
          {error}
        </Alert>
      )}
      <Formik
        validateOnChange
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          login(values);
        }}
      >
        {(formik) => (
          <Form>
            <Stack spacing={4} mt="4">
              <TextField
                inputLeftElement={<UserIcon />}
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
