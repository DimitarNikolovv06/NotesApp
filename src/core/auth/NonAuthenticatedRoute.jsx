import React from "react";
import { Redirect } from "react-router-dom";
import { getLoggedUser } from "../api/users.api";

export function NonAuthenticatedRoute(props) {
  if (!getLoggedUser()) {
    return <props.component {...props} />;
  } else {
    return <Redirect to="/" />;
  }
}
