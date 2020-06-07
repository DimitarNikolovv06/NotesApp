import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import { Switch, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./core/auth/AuthenticatedRoute";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import { NonAuthenticatedRoute } from "./core/auth/NonAuthenticatedRoute";
import { User } from "./components/users/user/User";

function App() {
  return (
    <div className="App">
      <Switch>
        <NonAuthenticatedRoute exact path="/login" component={Login} />
        <NonAuthenticatedRoute exact path="/register" component={Register} />
        <AuthenticatedRoute path="/" component={Layout} />
      </Switch>
    </div>
  );
}

export default App;
