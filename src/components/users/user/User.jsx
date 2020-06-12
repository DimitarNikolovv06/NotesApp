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
  const [isNewNoteSubmitted, setNoteSubmitted] = useState(false);

  useEffect(() => {
    getUser(currentUserId).then((response) => {
      setUser(response.data);
    });
  }, {});

  const [user, setUser] = useState({});
  const [newNote, setNewNote] = useState({
    authorId: loggedUser.id,
    authorName: loggedUser.name,
    dateCreated: new Date(),
    noteContent: "",
  });

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
      .then(() => setNoteSubmitted(true))
      .catch((err) => console.log(err))
      .finally(() => setNoteSubmitted(false));
  };

  const onChange = (event) => {
    event.persist();

    setNewNote((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="user container-fluid ">
      <div className="row">
        <div className="left-bar col-3">
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
              className="form-control btn-outline-info mt-4"
              onChange={onChange}
              type="text"
              name="noteContent"
              id="noteContent"
              value={newNote.noteContent}
              style={{ background: "none" }}
              placeholder="New Note"
            />
            <button type="submit" className="btn btn-outline-info mt-2">
              Add Note
            </button>
          </form>

          <p style={{ color: "whitesmoke" }}>You have notes left.</p>
        </div>
        <div className=" right-bar col-9">
          <NotesList
            userId={currentUserId}
            isNewNoteSubmitted={isNewNoteSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
