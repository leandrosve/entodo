import {
  AlertIcon,
  Button,
  CloseButton,
  Container,
  Heading,
  Stack,
} from "@chakra-ui/react";
import UserIcon from "@ant-design/icons/UserOutlined";
import KeyIcon from "@ant-design/icons/KeyOutlined";
import SmileIcon from "@ant-design/icons/SmileOutlined";
import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextField from "../util/TextField";
import Alert from "../util/Alert";

interface SignupValues {
  username: string;
  name:string;
  password: string;
  passwordConfirmation: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .max(256, "Username is too long.")
    .min(3, "Username is too short.")
    .required("This field is required"),
    name: Yup.string()
    .required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
      "Password is too weak."
    )
    .max(256, "Password is too long"),
  passwordConfirmation: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("password"), null], "Passwords don't match"),
});

const initialValues: SignupValues = {
  username: "",
  name: "",
  password: "",
  passwordConfirmation: "",
};

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string>();

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setError("Email is already taken.");
    }, 5000);
  };

  const handleCloseAlert = () => setError(undefined);

  return (
    <Container>
      <Heading textAlign="center" as="h2" size="lg">
        Sign up
      </Heading>
      {error && (
        <Alert status="error" handleClose={handleCloseAlert}>
         
          {error}
        
        </Alert>
      )}
      <Formik
        validateOnChange
        isInitialValid={false}
        initialValues={initialValues}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                inputLeftElement={<SmileIcon/>}
                name="name"
                type="text"
                placeholder="Name"
              />
              <TextField
                name="password"
                type="password"
                inputLeftElement={<KeyIcon />}
                helperText="Must be at least eight (8) characters long and contain a
              number or symbol"
                placeholder="Password"
                validMessage="Valid password"
              />

              <TextField
                name="passwordConfirmation"
                placeholder="Password confirmation"
                type="password"
                inputLeftElement={<KeyIcon />}
                validMessage="Passwords match"
              />

              <Button
                mt={4}
                colorScheme="brand"
                type="submit"
                isFullWidth
                isLoading={isLoading}
                disabled={!formik.isValid || isLoading}
              >
                Sign up
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignupForm;
