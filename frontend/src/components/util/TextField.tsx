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
          <FormControl isInvalid={!meta.error}>
            {/* uso invalid como valid porque _valid no funciona (solo para los estilos)*/}
            <InputGroup>
              <InputLeftElement>{inputLeftElement}</InputLeftElement>
              <Input
                {...inputProps}
                {...field}
                _invalid={{ borderColor: "green.200" }}
              />
            </InputGroup>
            {helperText && !(showHelpIfValid && !meta.error) && <FormHelperText>{helperText}</FormHelperText>}
            {meta.touched && meta.error && (
              <FormHelperText color="red.500">{meta.error}</FormHelperText>
            )}
            {validMessage && !meta.error && (
              <FormHelperText color="green.500">
                <Stack isInline align="center">
                  <CheckIcon />
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
