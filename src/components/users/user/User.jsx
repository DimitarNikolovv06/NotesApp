import React, { useState, useEffect } from "react";
import { getUser, getLoggedUser } from "../../../core/api/users.api";
import { UserCard } from "../user-card/UserCard";
import "./User.css";
import {
  makeNote,
  getNotes,
  afterDrag,
  deleteNote,
} from "../../../core/api/notes.api";
import { NotesList } from "../../notes/notes-list/NotesList";
import { DragDropContext } from "react-beautiful-dnd";

export function User(props) {
  const loggedUser = JSON.parse(getLoggedUser());
  const currentUserId = props.computedMatch.params.id;

  const [dragged, setDragged] = useState(false);
  const [isNewNoteSubmitted, setNoteSubmitted] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isNoteDeleted, setNoteDeleted] = useState(false);
  const [user, setUser] = useState({});
  const [newNote, setNewNote] = useState({
    authorId: currentUserId.id,
    authorName: "",
    dateCreated: new Date(),
    noteContent: "",
  });

  useEffect(() => {
    getUser(currentUserId).then((response) => {
      setUser(response.data);
    });

    getNotes(currentUserId)
      .then((result) => setNotes(result.data))
      .catch((err) => console.log(err));
  }, [currentUserId, isNewNoteSubmitted, isNoteDeleted]);

  useEffect(() => {
    if (dragged) {
      afterDrag(currentUserId, notes)
        .then(() => setDragged(false))
        .catch((err) => console.log(err));
    }
  }, [dragged, notes, currentUserId]);

  const onClickDelete = (id) => {
    if (loggedUser.id === currentUserId || loggedUser.isAdmin) {
      deleteNote(id)
        .then(() => {
          setNoteDeleted(!isNoteDeleted);
        })
        .catch((err) => console.log(err));
    } else {
      alert(`Can't delete a note that does not belong to you!`);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    makeNote(newNote)
      .then(() =>
        setNewNote((prevState) => ({ ...prevState, noteContent: "" }))
      )
      .then(() => setNoteSubmitted(!isNewNoteSubmitted))
      .catch((err) => console.log(err));
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
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // const listId = source.droppableId;
    const newArray = [...notes];

    const [removed] = newArray.splice(source.index, 1);

    newArray.splice(destination.index, 0, removed);

    setNotes(newArray);

    setDragged(true);

    return;
  };

  return (
    <div className="user container-fluid ">
      <div className="row">
        <div className="left-bar col-3">
          <UserCard style={{ width: "90%", height: "auto" }} user={user} />

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
              notes={notes}
              userId={currentUserId}
              onClickDelete={onClickDelete}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
