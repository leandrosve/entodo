import React, { FunctionComponent, ReactNode } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalProps,
} from "@chakra-ui/react";

interface Props extends ModalProps {
  title?: string;
}
const Modal: FunctionComponent<Props> = ({ title, children, ...props }) => {
 
  return (
    <ChakraModal {...props}>
      <ModalOverlay />
      <ModalContent padding="10px">
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
