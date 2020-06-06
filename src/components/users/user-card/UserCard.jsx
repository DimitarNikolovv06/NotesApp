import React from "react";
import "./UserCard.css";
import { Link } from "react-router-dom";

export function UserCard({ user }) {
  return (
    <div className="user-card m-4 p-2">
      <div className="picture-holder">
        <img src={user.picture} alt="avatar" />
      </div>
      <div className="info-holder">
        <div className="name">
          <Link className="btn-outline-info" to={`/users/${user.id}`}>
            {user.name}
          </Link>
          <span>, {user.age}</span>
        </div>
        <div className="email">{user.email}</div>
      </div>
    </div>
  );
}
