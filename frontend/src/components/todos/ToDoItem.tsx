import {
  Button,
  Checkbox,
  CheckboxProps,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";

import EditIcon from "@ant-design/icons/EditOutlined";

interface Props {}
interface CustomCheckboxProps extends CheckboxProps {
  isLoading?: boolean;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  isLoading,
  ...props
}) => isLoading ? <Button isDisabled isLoading /> : <Checkbox {...props} />

const ToDoItem: FC<Props> = () => {
  return (
    <Stack
      m="5px"
      flexDir={{ md: "row", base: "column" }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack spacing={5} isInline alignItems="center">
          <CustomCheckbox flexShrink={0} colorScheme="brand" size="lg" />
        <Text m="10px">
          Placeholder text for de title Placeholder text for de title
          Placeholder text for de title Placeholder text for de title
          Placeholder text for de title Placeholder text for de title
        </Text>
      </Stack>
      <Button
        flexShrink={0}
        w={{ md: "auto", base: "100%" }}
        leftIcon={<EditIcon />}
      >
        Edit
      </Button>
    </Stack>
  );
};

export default ToDoItem;
