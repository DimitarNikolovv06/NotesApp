import React from "react";
import "./UserCard.css";
import { Link } from "react-router-dom";

export function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="picture-holder">
        <img src={user.picture} alt="avatar" />
      </div>
      <div className="info-holder">
        <div className="name">
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
        <div className="age">{user.age}</div>
        <div className="email">{user.email}</div>
      </div>
    </div>
  );
}
