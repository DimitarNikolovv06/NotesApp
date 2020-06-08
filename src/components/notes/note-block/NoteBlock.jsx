import React, { useState } from "react";
import "./NoteBlock.css";
import { NoteEditInput } from "./NoteEditInput";

export function NoteBlock({ note, onDelete }) {
  const [isClicked, setIsClicked] = useState(false);

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
      {isClicked && <NoteEditInput note={note} />}

      <div className="note-content">{note.noteContent}</div>
      <div className="note-date">{note.dateCreated}</div>
    </div>
  );
}
