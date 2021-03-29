
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import { Dashboard } from "./view/Dashboard/Dashboard";
import { Login } from "./view/Login/Login";
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state: any) => state.userLogin);
  return (
    <div data-theme={`${currentUser.isDarkTheme ? "dark" : 'light'}`} className="root__class">
      <Router >
        <ToastContainer
          position="top-right"
          autoClose={2000}
          transition={Slide}
        />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
