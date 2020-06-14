import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  getLoggedUser,
  deleteUser,
} from "../../../core/api/users.api";
import { UserCard } from "../user-card/UserCard";

export function UsersList(props) {
  const [users, setUsers] = useState([]);
  const search = props.location.search;
  const params = search.split("=")[1];
  const loggedUser = JSON.parse(getLoggedUser());
  const [isUserDeleted, setUserDeleted] = useState(false);

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
    <div
      id="list"
      className="users-list d-flex justify-content-center flex-wrap m-4"
    >
      {users.map((user) => (
        <UserCard user={user} key={user.id} onClick={onClick} />
      ))}
    </div>
  );
}
