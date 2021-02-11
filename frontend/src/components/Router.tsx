import React, { useContext } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import FoldersModule from "./folders/FoldersModule";
import Modal from "./layout/Modal";
import ToDoListModule from "./todos/ToDoListModule";
import LoginForm from "./user/LoginForm";
import SignupForm from "./user/SignupForm";

const Router = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  return (
    <>
      {isAuthenticated && (
        <>
          <Route path="/folders" component={FoldersModule} />
          <Route path="/todos" exact>
            <ToDoListModule title="Tasks with no folder" />
          </Route>
        </>
      )}
      <Route path={["/login", "/signup"]} exact >
          {isAuthenticated && <Redirect to="/"/>}
          <Modal isOpen={true} onClose={()=>history.replace("/")}>

                 <Route path="/login" exact component={LoginForm}/>

                 <Route path="/signup" exact component={SignupForm}/>

          </Modal>
          
      </Route>
    </>
  );
};

export default Router;
