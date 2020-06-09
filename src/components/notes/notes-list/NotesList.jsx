import React, { useEffect, useState } from "react";
import { NoteBlock } from "../note-block/NoteBlock";
import { deleteNote, getNotes, getAllNotes } from "../../../core/api/notes.api";
import { getLoggedUser } from "../../../core/api/users.api";

export function NotesList({ userId, newNote }) {
  const allNotes = getAllNotes();
  const loggedUser = JSON.parse(getLoggedUser());
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes(userId)
      .then((result) => setNotes(result.data))
      .catch((err) => console.log(err));
  }, [newNote]);

  const onClickDelete = (id) => {
    deleteNote(id)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteBlock note={note} key={note.id} onDelete={onClickDelete} />
      ))}
    </div>
  );
}
