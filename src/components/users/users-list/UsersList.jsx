import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../../../core/api/users.api";
import { UserCard } from "../user-card/UserCard";

export function UsersList(props) {
  const [users, setUsers] = useState([]);
  const search = props.location.search;
  const params = search.split("=")[1];
  const [isUserDeleted, setUserDeleted] = useState(false);

  const userCardStyle = {
    width: "330px",
    height: "auto",
  };

  const onClick = (id) => {
    deleteUser(id)
      .then(() => setUserDeleted(!isUserDeleted))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers(params)
      .then((allUsers) => {
        setUsers(allUsers);
      })
      .catch((err) => console.log(err));
  }, [params, isUserDeleted]);

  return (
    <div id="list" className="users-list">
      {users.map((user) => (
        <UserCard
          path={props.path}
          user={user}
          key={user.id}
          onClick={onClick}
          style={userCardStyle}
        />
      ))}
    </div>
  );
}
