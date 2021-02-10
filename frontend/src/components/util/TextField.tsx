import {
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Stack,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import React, { FC, ReactNode } from "react";

import CheckIcon from "@ant-design/icons/CheckSquareFilled";

import ErrorIcon from "@ant-design/icons/ExclamationCircleOutlined";

interface Props extends InputProps {
  inputLeftElement?: ReactNode;
  name: string;
  helperText?: string;
  isQuiet?: boolean;
  validMessage?: string;
  showHelpIfValid?: boolean
}

const TextField: FC<Props> = ({
  inputLeftElement,
  name,
  isQuiet = false,
  helperText,
  validMessage,
  showHelpIfValid=true,
  ...inputProps
}) => {
  return (
    <FormControl start>
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur
          meta,
        }:FieldProps) => (
          <FormControl   >

            <InputGroup>
              <InputLeftElement>{inputLeftElement}</InputLeftElement>
              <Input
                {...inputProps}
                {...field}
                
                borderColor={ meta.touched ? (!!meta.error ? "red.500" :"green.200"):"#CBD5E0"}
              />
            </InputGroup>
            {helperText && !(showHelpIfValid && !meta.error) && <FormHelperText>{helperText}</FormHelperText>}
            {meta.touched && meta.error && (
              <FormHelperText textAlign="left" color="red.500">
                 <Stack isInline >
                 <div><ErrorIcon/></div>
                  <div> {meta.error}</div>
                </Stack></FormHelperText>
            )}
            {validMessage && !meta.error && (
              <FormHelperText color="green.500">
                <Stack isInline align="center">
                <div><CheckIcon /></div>
                  <div> {validMessage}</div>
                </Stack>
              </FormHelperText>
            )}
          </FormControl>
        )}
      </Field>
    </FormControl>
  );
};

export default TextField;
