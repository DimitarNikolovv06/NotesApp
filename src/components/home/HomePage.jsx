import React from "react";
import { getLoggedUser } from "../../core/api/users.api";

export function HomePage(props) {
  const loggedUser = JSON.parse(getLoggedUser());

  return (
    <div className="home">
      {console.log(loggedUser)}
      <h1 style={{ color: "#4a20bd" }}>Welcome {loggedUser.name}</h1>
    </div>
  );
}
