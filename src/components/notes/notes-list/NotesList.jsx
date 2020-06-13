import React, { useEffect, useState } from "react";
import { NoteBlock } from "../note-block/NoteBlock";
import { deleteNote, getNotes } from "../../../core/api/notes.api";
import { getLoggedUser } from "../../../core/api/users.api";

export function NotesList({ userId, isNewNoteSubmitted }) {
  const loggedUser = JSON.parse(getLoggedUser());
  const [notes, setNotes] = useState([]);
  const [isEffectRequired, setEffectRequired] = useState(false);

  useEffect(() => {
    getNotes(userId)
      .then((result) => setNotes(result.data))
      .catch((err) => console.log(err));
  }, [isEffectRequired, isNewNoteSubmitted, userId]);

  const onClickDelete = (id) => {
    if (loggedUser.id === userId || loggedUser.isAdmin) {
      deleteNote(id)
        .then(() => {
          setEffectRequired(true);
        })
        .catch((err) => console.log(err))
        .finally(() => setEffectRequired(false));
    } else {
      alert(`Can't delete a note that does not belong to you!`);
    }
  };

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteBlock
          note={note}
          key={note.id}
          onDelete={onClickDelete}
          userId={userId}
        />
      ))}
    </div>
  );
}
