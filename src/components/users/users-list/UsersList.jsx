import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../../core/api/users.api";
import { UserCard } from "../user-card/UserCard";
export function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((allUsers) => {
      setUsers(allUsers.data);
    });
  }, []);

  return (
    <div
      id="list"
      className="users-list d-flex justify-content-center flex-wrap m-4"
    >
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
}
