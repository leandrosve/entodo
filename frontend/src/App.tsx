import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import "./App.css";
import FolderList from "./components/folders/FolderList";
import Header from "./components/layout/Header";
import { AuthProvider } from "./components/context/AuthContext";
import ToDoListModule from "./components/todos/ToDoListModule";
import Welcome from "./components/user/Welcome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Container maxW="600px">
            <Welcome/>
            <FolderList />
            <ToDoListModule />
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
