import React, { useState } from "react";
import "./NoteBlock.css";
import { NoteEditForm } from "./NoteEditForm";
import { useEffect } from "react";
import { editNote } from "../../../core/api/notes.api";
import { getLoggedUser } from "../../../core/api/users.api";

export function NoteBlock({ note, onDelete, userId }) {
  const loggedUser = JSON.parse(getLoggedUser());
  const [isClicked, setIsClicked] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });
  const [isSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted)
      document.getElementById(`cont-${note.id}`).innerText =
        editedNote.noteContent;
  });

  const onNoteEdit = (event) => {
    event.persist();

    setEditedNote((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onNoteSubmit = (event) => {
    event.preventDefault();
    setSubmitted(!isSubmitted);

    editNote(editedNote)
      .then((result) => {
        note = result.data;
      })
      .catch((err) => console.log(err));
  };

  const onClick = () => {
    if (loggedUser.id === userId || loggedUser.isAdmin) {
      setIsClicked(!isClicked);
    } else {
      alert(`Can't edit a note that does not belong to you!`);
    }
  };

  return (
    <div className="note-block">
      <div>
        <button
          className="btn btn-outline-info"
          type="button"
          onClick={onClick}
        >
          Edit Note
        </button>
        <button
          className="btn btn-outline-info"
          type="button"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
      {isClicked && (
        <NoteEditForm
          note={note}
          onNoteEdit={onNoteEdit}
          onNoteSubmit={onNoteSubmit}
          isSubmitted={isSubmitted}
          editedNote={editedNote}
        />
      )}

      <div id={`cont-${note.id}`} className="note-content">
        {note.noteContent}
      </div>

      <div className="note-date">{note.dateCreated}</div>
    </div>
  );
}
