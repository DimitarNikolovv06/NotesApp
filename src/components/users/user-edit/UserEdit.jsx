import React, { useState, useEffect } from "react";
import { getUser, editUser } from "../../../core/api/users.api";
import { Redirect } from "react-router-dom";

export function UserEdit(props) {
  const style = {
    width: "500px",
    height: "500px",
    border: "2px solid #ca7df9",
  };

  const saveBtn = {
    margin: "20px 0",
  };

  const currentUserId = props.computedMatch.params.id;
  const [userEdit, setUserEdit] = useState({
    email: "",
    name: "",
    age: 0,
    password: "",
    isAdmin: false,
    isActive: true,
  });

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (currentUserId) {
      getUser(currentUserId)
        .then((response) => {
          setUserEdit(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUserId]);

  const onSubmit = (event) => {
    event.preventDefault();
    editUser(userEdit)
      .then(() => {
        setEdit(true);
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

  const onCheckBoxChange = (event) => {
    event.persist();
    console.log(userEdit);
    setUserEdit((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };

  return (
    <>
      {edit && <Redirect to="/users" />}
      <div className="user-edit-wrapper d-flex flex-column justify-content-center align-items-center">
        <h1 style={{ color: "whitesmoke" }}>
          {props.path === "/create" ? "Create" : "Edit"}
        </h1>
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
              placeholder="Email"
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
                name="isAdmin"
                onChange={onCheckBoxChange}
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
                name="isActive"
                onChange={onCheckBoxChange}
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

          <button
            style={saveBtn}
            type="submit"
            className="btn btn-outline-info"
          >
            {props.path === "/create" ? "Create" : "Edit"}
          </button>
        </form>
      </div>
    </>
  );
}
