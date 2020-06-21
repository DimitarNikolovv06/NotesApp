import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { logout, getLoggedUser } from "../../../core/api/users.api";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

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
      {console.log(window.innerWidth)}
      {isLoggedOut && <Redirect to="/login" />}
      <Navbar className="pink-border" expand="lg">
        <Navbar.Brand id="brand" href="/users">
          [Notes-app]
        </Navbar.Brand>
        <Navbar.Toggle
          style={{ backgroundColor: "#ca7df9" }}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              style={{ color: "white" }}
              href={`/users/${loggedUser.id}`}
            >
              Home
            </Nav.Link>
            <Nav.Link style={{ color: "white" }} href="/users">
              Users
            </Nav.Link>
            {loggedUser.isAdmin && (
              <Nav.Link style={{ color: "white" }} href="/create">
                Create User
              </Nav.Link>
            )}
          </Nav>

          {props.location.pathname === "/users" && (
            <Form
              inline
              onSubmit={onSubmit}
              className="form-inline my-2 my-lg-0 d-flex justify-content-center align-items-center "
            >
              <FormControl
                name="searchInput"
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
              <Button variant="outline-info" type="submit">
                Search
              </Button>
            </Form>
          )}
          <Button variant="outline-info" type="onclick" onClick={onClick}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
});
