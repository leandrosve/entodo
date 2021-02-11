import { Container, Divider, Flex, Text } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";
import Welcome from "../user/Welcome";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
    children: React.ReactChild
}
const Layout:FC<Props> = ({children}) => {
  return (
    
    <Flex flexDir="column" justifyContent="center">
      <Header />
      <Flex flexDir="column" minH="60vh" width="100%" justifyContent="center">
        <Welcome />
        <Divider/>
        {children}
      </Flex>
      <Footer/>
      </Flex>
  );
};

export default Layout;
