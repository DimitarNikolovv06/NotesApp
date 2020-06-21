import React, { useState } from "react";
import { login, getLoggedUser } from "../../../core/api/users.api";
import { Redirect, Link } from "react-router-dom";
import Background from "../../../background/notes.jpg";

export function Login() {
  const [userData, setUserData] = useState(0);
  const [isLoginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const backgroundImg = {
    backgroundImage: `linear-gradient(90deg, rgba(64,13,100,0.8) 0%, rgba(110,20,148,0.7) 100%) , url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  };

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
      {isLoginSuccess && (
        <Redirect to={`/users/${JSON.parse(getLoggedUser()).id}`} />
      )}
      <div id="login-container" className="container-fluid">
        <div style={{ minHeight: "100vh" }} className="row">
          <div className="col-3 d-flex align-items-center justify-content-center bg-light">
            <div
              id="login"
              className="form-group d-flex justify-content-center align-items-center flex-column"
            >
              {errorMessage && (
                <span className="text-danger">{errorMessage}</span>
              )}
              <form onSubmit={onSubmit}>
                <label className="pink" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-control bg-none"
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
                <div id="div-buttons" className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-info m-2 ">
                    LOGIN
                  </button>
                  <Link to="/register" className="btn btn-outline-info m-2 ">
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div id="background" style={backgroundImg} className="col-9"></div>
        </div>
      </div>
    </>
  );
}
