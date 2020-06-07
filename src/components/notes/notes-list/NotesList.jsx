import React from "react";
import { NoteBlock } from "../note-block/NoteBlock";

export function NotesList({ notes }) {
  return (
    <div className="notes-list">
      {console.log(notes)}
      {notes.map((note) => (
        <NoteBlock note={note} key={note.noteId} />
      ))}
    </div>
  );
}
