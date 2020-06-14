import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./Header.css";
import { logout, getLoggedUser } from "../../../core/api/users.api";

export const Header = withRouter((props) => {
  const [isLoggedOut, setLogout] = useState(false);
  const loggedUser = JSON.parse(getLoggedUser()) || false;
  const [searchParam, setSearchParam] = useState("");
  const history = props.history;
  const pathName = props.location.pathname.substring(0);
  const historyObj = { pathName, search: "" };

  const onClick = () => {
    logout();
    setLogout(true);
  };

  const onKeyDown = (event) => {
    const key = event.key;

    if (key === "Backspace") {
      setSearchParam("");
    }
  };

  const onChange = (event) => {
    setSearchParam(event.target.value);
    event.persist();
    setSearchParam(event.target.value);

    if (searchParam) {
      historyObj.search = `?=${searchParam}`;
    }

    history.push(historyObj);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (searchParam) {
      historyObj.search = `?q=${searchParam}`;
    }

    history.push(historyObj);
  };

  return (
    <>
      {isLoggedOut && <Redirect to="/login" />}
      <div className="header">
        <nav
          id="nav"
          className="navbar navbar-expand-lg navbar-dark pink-border"
        >
          <Link id="notes-app" className="navbar-brand" to="/users">
            [Notes-app]
          </Link>
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
                <Link className="nav-link" to={`/users/${loggedUser.id}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              {loggedUser.isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/create">
                    Create User
                  </Link>
                </li>
              )}
            </ul>
            <form onSubmit={onSubmit} className="form-inline my-2 my-lg-0">
              <input
                name="searchInput"
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={onChange}
                onKeyDown={onKeyDown}
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
});
