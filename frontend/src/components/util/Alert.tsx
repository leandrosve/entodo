import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertProps,
  CloseButton,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface Props extends AlertProps {
  hasIcon?: boolean;
  handleClose?: () => void;
}
const Alert: FC<Props> = ({
  hasIcon = true,
  children,
  handleClose,
  ...params
}) => {
  return (
    <ChakraAlert {...params}>
      {hasIcon && <AlertIcon />}
      {children}
      {handleClose && (
        <CloseButton
          position="absolute"
          borderRadius="50%"
          top={0}
          right={0}
          variant="ghost"
          onClick={handleClose}
        />
      )}
    </ChakraAlert>
  );
};

export default Alert;
