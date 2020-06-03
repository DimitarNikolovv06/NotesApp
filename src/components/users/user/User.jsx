import React, { useState, useEffect } from "react";
import { getUser } from "../../../core/api/users.api";
import { UserCard } from "../user-card/UserCard";
import "./User.css";

export function User(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(props.match.params.id).then((response) => setUser(response.data));
  }, {});

  //try with {} tomorrow
  return (
    <div className="user d-flex">
      <div className="left-bar">
        <UserCard user={user} key={user.id} />
      </div>
      <div id="right-bar">
        <h1>TESSSST</h1>
      </div>
    </div>
  );
}
