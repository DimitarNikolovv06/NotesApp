import React, { useState } from "react";
import { register } from "../../../core/api/users.api";
import { Redirect, Link } from "react-router-dom";

const style = {
  width: "500px",
  height: "500px",
  border: "2px solid #ca7df9",
};

export function Register() {
  const [isRegistered, setRegistered] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

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

    register(userData)
      .then((result) => {
        if (result) {
          setRegistered(true);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <>
      {isRegistered && <Redirect to="/login" />}
      <div
        className="register-wrapper  d-flex flex-column justify-content-center align-items-center bg-light"
        style={{ height: "100vh", width: "100vw" }}
      >
        <h1>Registration</h1>
        <form
          className=" d-flex flex-column justify-content-center align-items-center"
          style={style}
          onSubmit={onSubmit}
        >
          {errorMessage && <span className="text-danger">{errorMessage}</span>}
          <div className="form-group">
            <label labelfor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              placeholder="Enter email"
              onChange={onInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label labelfor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter name"
              onChange={onInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label labelfor="exampleInputEmail1">Age</label>
            <input
              type="number"
              min="12"
              className="form-control"
              id="age"
              name="age"
              onChange={onInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label labelfor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              onChange={onInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-outline-info">
            Register
          </button>
          <Link to="/login">Already have an account?</Link>
        </form>
      </div>
    </>
  );
}
