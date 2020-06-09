import React, { useState } from "react";
import "./NoteBlock.css";
import { NoteEditInput } from "./NoteEditInput";
import { useEffect } from "react";
import { editNote, getAllNotes } from "../../../core/api/notes.api";

const allNotes = getAllNotes();

export function NoteBlock({ note, onDelete }) {
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

    console.log(editedNote);
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
    setIsClicked(!isClicked);
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
        <NoteEditInput
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
