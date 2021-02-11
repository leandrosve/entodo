import { Heading, Image, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Welcome = () => {
  const { auth, isAuthenticated } = useContext(AuthContext);
  return (
    <Stack justifyContent="center">
      <Image  m="auto" src="/brand.png" boxSize="100px" objectFit="cover" alt="Entodo" /> 
      <Heading>
        {isAuthenticated
          ? `Welcome, ${auth.user.name}`
          : "Welcome, please log in to start using this app!"}
      </Heading>
    </Stack>
  );
};

export default Welcome;
