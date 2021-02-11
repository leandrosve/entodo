import { Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Welcome = () => {
  const { auth, isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      <Heading>
        {isAuthenticated
          ? `Welcome, ${auth.user.name}`
          : "Welcome, please log in to start using this app!"}
      </Heading>
    </div>
  );
};

export default Welcome;
