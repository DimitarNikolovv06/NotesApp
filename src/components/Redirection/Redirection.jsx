import React from "react";
import { getLoggedUser } from "../../core/api/users.api";
import { Redirect } from "react-router-dom";

export function Redirection() {
  const userId = JSON.parse(getLoggedUser()).id;

  return <Redirect to={`/users/${userId}`} />;
}
