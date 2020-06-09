import React, { useState, useEffect } from "react";
import { getUser, editUser } from "../../../core/api/users.api";
import { Redirect } from "react-router-dom";

export function UserEdit(props) {
  const style = {
    width: "500px",
    height: "500px",
    border: "2px solid #ca7df9",
  };

  const [userEdit, setUserEdit] = useState({
    email: "",
    name: "",
    age: "",
    password: "",
    isAdmin: false,
    isActive: false,
  });

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (props.computedMatch.params.id) {
      getUser(props.computedMatch.params.id)
        .then((response) => {
          setUserEdit(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  console.log(userEdit);

  const onSubmit = (event) => {
    event.preventDefault();
    editUser(userEdit)
      .then(() => {
        setEdit(true);
        console.log("success");
      })
      .catch((err) => console.log(err));
  };

  const onInputChange = (event) => {
    event.persist();
    setUserEdit((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      {edit && <Redirect to="/users" />}
      <div className="user-edit-wrapper d-flex flex-column justify-content-center align-items-center">
        <h1 style={{ color: "whitesmoke" }}>Edit/Create</h1>
        <form
          className=" d-flex flex-column justify-content-center align-items-center"
          style={style}
          onSubmit={onSubmit}
        >
          <div className="form-group">
            <label labelfor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              value={userEdit.email}
              onChange={onInputChange}
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
              value={userEdit.name}
              onChange={onInputChange}
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
              value={userEdit.age}
              onChange={onInputChange}
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
            />
          </div>
          <div
            className="d-flex justify-content-around"
            style={{ width: "200px" }}
          >
            <div className="form-check">
              <input
                checked={userEdit.isAdmin}
                type="checkbox"
                className="form-check-input"
                id="admin"
                onChange={onInputChange}
              />
              <label
                style={{ color: "whitesmoke" }}
                className="form-check-label"
                labelfor="admin"
              >
                Admin
              </label>
            </div>
            <div className="form-check">
              <input
                checked={userEdit.isActive}
                type="checkbox"
                className="form-check-input"
                id="active"
                onChange={onInputChange}
              />
              <label
                style={{ color: "whitesmoke" }}
                className="form-check-label"
                labefor="active"
              >
                Active
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-outline-info">
            Edit
          </button>
        </form>
      </div>
    </>
  );
}
