import React from "react";
import "./NoteBlock.css";

export function NoteBlock({ note }) {
  return (
    <div className="note-block">
      <div className="note-content">{note.noteContent}</div>
      <div className="note-date">{note.dateCreated}</div>
    </div>
  );
}
