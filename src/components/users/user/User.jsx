import React, { useState, useEffect } from "react";
import { getUser, getLoggedUser } from "../../../core/api/users.api";
import { UserCard } from "../user-card/UserCard";
import "./User.css";
import { makeNote } from "../../../core/api/notes.api";
import { NotesList } from "../../notes/notes-list/NotesList";
import { DragDropContext } from "react-beautiful-dnd";

export function User(props) {
  const loggedUser = JSON.parse(getLoggedUser());
  const currentUserId = props.computedMatch.params.id;
  const [isNewNoteSubmitted, setNoteSubmitted] = useState(false);
  const [notesDragged, setNotesDragged] = useState(false);

  useEffect(() => {
    getUser(currentUserId).then((response) => {
      setUser(response.data);
    });
  }, [currentUserId, notesDragged]);

  const [user, setUser] = useState({});
  const [newNote, setNewNote] = useState({
    authorId: currentUserId.id,
    authorName: "",
    dateCreated: new Date(),
    noteContent: "",
  });

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
      authorId: user.id,
      authorName: user.name,
      [event.target.name]: event.target.value,
    }));
  };

  const onDragEnd = (result) => {
    setNotesDragged(!notesDragged);
  };

  return (
    <div className="user container-fluid ">
      <div className="row">
        <div className="left-bar col-3">
          <UserCard
            style={{ width: "90%", height: "auto" }}
            user={user}
            key={user.id}
          />

          {(loggedUser.id === currentUserId || loggedUser.isAdmin) && (
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
          )}
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className=" right-bar col-9">
            <NotesList
              userId={currentUserId}
              isNewNoteSubmitted={isNewNoteSubmitted}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
