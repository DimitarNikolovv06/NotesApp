import React, { useState, useEffect } from "react";
import {
  getUser,
  deleteUser,
  getLoggedUser,
} from "../../../core/api/users.api";
import { UserCard } from "../user-card/UserCard";
import "./User.css";
import { Link } from "react-router-dom";
import { makeNote } from "../../../core/api/notes.api";
import { NotesList } from "../../notes/notes-list/NotesList";

export function User(props) {
  const loggedUser = JSON.parse(getLoggedUser());
  const currentUserId = props.computedMatch.params.id;

  const [user, setUser] = useState({});

  const [newNote, setNewNote] = useState({
    authorId: loggedUser.id,
    authorName: loggedUser.name,
    dateCreated: new Date(),
    noteContent: "",
  });

  useEffect(() => {
    getUser(currentUserId).then((response) => {
      setUser(response.data);
    });
  }, {});

  const onClick = () => {
    if (loggedUser !== user && !user.isAdmin) {
      deleteUser(user.id)
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
    } else {
      console.log("Can not delete user that is admin!");
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    makeNote(newNote)
      .then(() =>
        setNewNote((prevState) => ({ ...prevState, noteContent: "" }))
      )
      .catch((err) => console.log(err));
  };

  const onChange = (event) => {
    event.persist();

    setNewNote((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="user">
      <div className="left-bar">
        <UserCard user={user} key={user.id} />
        {loggedUser.isAdmin && (
          <div>
            <Link
              className="btn btn-outline-info"
              to={`/users/${user.id}/edit`}
              user={user}
            >
              Edit
            </Link>
            <Link
              to="/"
              className="btn btn-outline-info"
              onClick={onClick}
              user={user}
            >
              Delete
            </Link>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <input
            className="form-control btn-outline-info"
            onChange={onChange}
            type="text"
            name="noteContent"
            id="noteContent"
            value={newNote.noteContent}
            style={{ background: "none" }}
            placeholder="New Note"
          />

          <button type="submit" className="btn btn-outline-info">
            Add Note
          </button>
        </form>
        {/* <hr
          style={{ color: "red", width: "100%", height: "20px" }}
          className=""
        /> */}
      </div>
      <div className=" right-bar">
        <NotesList userId={currentUserId} newNote={newNote} />
      </div>
    </div>
  );
}
