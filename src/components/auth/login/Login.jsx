import React, { useState } from "react";
import "./Login.css";
import { login, getLoggedUser } from "../../../core/api/users.api";
import { Redirect, Link } from "react-router-dom";
import Background from "../../../background/notes.jpg";

export function Login() {
  const [userData, setUserData] = useState(0);
  const [isLoginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onInputChange = (event) => {
    event.persist();
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    setErrorMessage("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    login(userData)
      .then(() => {
        if (localStorage) {
          setLoginSuccess(true);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <>
      {/* {(document.body.style.backgroundImage = `url(${Background})`)} */}
      {isLoginSuccess && (
        <Redirect to={`/users/${JSON.parse(getLoggedUser()).id}`} />
      )}
      <div className="login-wrapper d-flex justify-content-center align-items-center">
        <div
          id="login"
          className="form-group d-flex justify-content-center align-items-center flex-column"
        >
          {errorMessage && <span className="text-danger">{errorMessage}</span>}
          <form onSubmit={onSubmit}>
            <label className="pink" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              onChange={onInputChange}
            />
            <label className="pink" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              onChange={onInputChange}
            />
            <div id="div-buttons" className="d-flex ">
              <button type="submit" className="btn btn-outline-info ">
                LOGIN
              </button>
              <Link to="/register" className="btn btn-outline-info ">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
