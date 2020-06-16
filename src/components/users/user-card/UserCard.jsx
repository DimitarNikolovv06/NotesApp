import React from "react";
import "./UserCard.css";
import { Link } from "react-router-dom";
import { getLoggedUser } from "../../../core/api/users.api";

export function UserCard({ user, onClick, path, style }) {
  const loggedUser = JSON.parse(getLoggedUser());

  return (
    <div style={style} className="user-card p-2">
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
        <div>
          {loggedUser.isAdmin &&
            loggedUser.id !== user.id &&
            path === "/users" && (
              <button
                className="btn btn-outline-info"
                onClick={() => {
                  onClick(user.id);
                }}
                user={user}
              >
                Delete
              </button>
            )}
          {loggedUser.isAdmin && (
            <Link
              className="btn btn-outline-info"
              to={`/users/${user.id}/edit`}
              user={user}
            >
              Edit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
