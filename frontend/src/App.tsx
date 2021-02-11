import { Container, Divider } from "@chakra-ui/react";
import { BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import { AuthProvider } from "./components/context/AuthContext";
import ToDoListModule from "./components/todos/ToDoListModule";
import Welcome from "./components/user/Welcome";
import FoldersModule from "./components/folders/FoldersModule";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Container maxW="600px">
            <Welcome/>
            <Divider/>
            <Route path="/folders" component={FoldersModule}/>

            <Route path="/todos" exact component={ToDoListModule}/>
            
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
