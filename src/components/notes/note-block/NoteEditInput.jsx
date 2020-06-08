import React, { useState, useEffect } from "react";
import { editNote } from "../../../core/api/notes.api";

export function NoteEditInput({ note }) {
  const [editedNote, setEditedNote] = useState({ ...note });
  const [isSubmitted, setSubmitted] = useState(false);

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

  return (
    <>
      {!isSubmitted && (
        <div>
          <form
            onSubmit={onNoteSubmit}
            style={{ background: "none" }}
            type="submit"
          >
            <input
              className="form-control btn-outline-info"
              placeholder={note.noteContent}
              type="text"
              name="noteContent"
              id="noteContent2"
              style={{ background: "none" }}
              onChange={onNoteEdit}
            />
            <button style={{ display: "none" }} type="submit"></button>
          </form>
        </div>
      )}
    </>
  );
}
