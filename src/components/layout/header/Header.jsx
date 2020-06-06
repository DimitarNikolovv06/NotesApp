import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Header.css";
import { logout } from "../../../core/api/users.api";

export function Header() {
  const [isLoggedOut, setLogout] = useState(false);

  const onClick = (event) => {
    logout();
    setLogout(true);
  };

  return (
    <>
      {isLoggedOut && <Redirect to="/login" />}
      <div className="header">
        <nav
          id="nav"
          className="navbar navbar-expand-lg navbar-dark pink-border"
        >
          <a className="navbar-brand" href="#">
            Notes-app
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Create User
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-info my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
              <button
                className="btn btn-outline-info my-2 my-sm-0"
                type="onclick"
                onClick={onClick}
              >
                Logout
              </button>
            </form>
          </div>
        </nav>
      </div>
    </>
  );
}
