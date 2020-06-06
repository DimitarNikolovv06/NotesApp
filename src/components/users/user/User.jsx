import React, { useState, useEffect } from "react";
import {
  getUser,
  deleteUser,
  getLoggedUser,
} from "../../../core/api/users.api";
import { UserCard } from "../user-card/UserCard";
import "./User.css";
import { Link, Redirect } from "react-router-dom";

export function User(props) {
  const [user, setUser] = useState({});
  // const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getUser(props.computedMatch.params.id).then((response) =>
      setUser(response.data)
    );
  }, {});

  const loggedUser = JSON.parse(getLoggedUser());
  const onClick = () => {
    deleteUser(user.id)
      .then(() => console.log("success"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="user d-flex">
      {console.log(user)}
      <div className="left-bar">
        <UserCard user={user} key={user.id} />
        {loggedUser.isAdmin && (
          <div>
            <Link
              className="btn btn-outline-info"
              to={`/users/${user.id}/edit`}
              user={user}
            >
              Edit
            </Link>
            <Link
              to="/"
              className="btn btn-outline-info"
              onClick={onClick}
              user={user}
            >
              Delete
            </Link>
          </div>
        )}
      </div>
      <div id="right-bar"></div>
    </div>
  );
}
