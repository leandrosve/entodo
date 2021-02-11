import { Container } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Router from "./components/Router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Router/>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
