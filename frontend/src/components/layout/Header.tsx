import {
  Box,
  Heading,
  Flex,
  Button,
  FlexProps,
  IconButton,
  HStack,
  Image,
  Stack,
} from "@chakra-ui/react";
import React, { FunctionComponent, useContext } from "react";

import UserAddIcon from "@ant-design/icons/UserAddOutlined";
import MenuOutlined from "@ant-design/icons/MenuOutlined";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import LoginForm from "../user/LoginForm";
import SignupForm from "../user/SignupForm";
import AuthContext from "../context/AuthContext";

interface MenuItemProps {
  children: React.ReactNode;
  href: string;
}
const MenuItems: FunctionComponent<MenuItemProps> = ({ children, href }) => (
  <Link to={href}>
    <Button margin="10px" display="block" variant="link">
      {children}
    </Button>
  </Link>
);

const Brand = () => (
  <Link to="/">
    <Heading
      as="h1"
      cursor="pointer"
      size="lg"
      letterSpacing={"-.1rem"}
      color="brand.400"
    >
      <HStack>
        <Image boxSize="50px" src="/brand-small.png" alt="entodo" />
        <Box>Entodo</Box>
      </HStack>
    </Heading>
  </Link>
);

const Header: FunctionComponent<FlexProps> = (props) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

  const handleToggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <>    
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        boxShadow="base"
        {...props}
      >
        <Flex align="center" mr={5}>
          <Brand />
        </Flex>
        <Box display={{ base: !isDrawerOpen ? "block" : "none", md: "none" }}>
          <IconButton
            aria-label="toggle menu"
            bg="transparent"
            onClick={handleToggleDrawer}
            fontSize="20px"
            icon={<MenuOutlined />}
          />
        </Box>

        <Box display={{ base: isDrawerOpen ? "block" : "none", md: "none" }}>
          <IconButton
            aria-label="toggle menu"
            bg="transparent"
            onClick={handleToggleDrawer}
            fontSize="20px"
            icon={<CloseOutlined />}
          />
        </Box>
        {isAuthenticated && <Box
          display={{ base: isDrawerOpen ? "flex" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          justifyContent={{ base: "center", md: "start" }}
          flexDir={{ base: "column", md: "row" }}
          alignItems="center"
          flexGrow={1}
        >
          <MenuItems href="/todos">Tasks</MenuItems>
          <MenuItems href="/folders">Folders</MenuItems>
        </Box>}

        <Box
          display={{ base: isDrawerOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
          width={{ base: "full", md: "auto" }}
        >
          <Stack
            direction={isDrawerOpen ? "column" : "row"}
            spacing={4}
            align="center"
          >
            {!isAuthenticated ? (
              <>
                <Link to="/signup">
                  <Button
                    colorScheme="brand"
                    variant="ghost"
                    border="1px"
                    leftIcon={<UserAddIcon />}
                  >
                    Create account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    colorScheme="brand"
                  >
                    Log in
                  </Button>
                </Link>
              </>
            ) : (
              <Button variant="ghost" onClick={logout}>
                Log out
              </Button>
            )}
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
