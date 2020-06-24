import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import { Switch } from "react-router-dom";
import { AuthenticatedRoute } from "./core/auth/AuthenticatedRoute";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import { NonAuthenticatedRoute } from "./core/auth/NonAuthenticatedRoute";

function App() {
  process.env.PORT = 3000;

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
