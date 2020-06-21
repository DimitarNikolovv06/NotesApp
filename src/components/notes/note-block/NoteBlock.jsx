import React, { useState } from "react";
import "./NoteBlock.css";
import { NoteEditForm } from "./NoteEditForm";
import { useEffect } from "react";
import { editNote } from "../../../core/api/notes.api";
import { getLoggedUser } from "../../../core/api/users.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

export function NoteBlock({ note, onDelete, userId, index }) {
  const loggedUser = JSON.parse(getLoggedUser());
  const [isClicked, setIsClicked] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditIconClicked, setIconClicked] = useState(false);
  const editIcon = <FontAwesomeIcon icon={faEdit} />;
  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;

  const iconsStyle = {
    position: "absolute",
    margin: "5px",
    background: "none",
    border: "none",
    zIndex: 100,
  };

  useEffect(() => {
    if (isSubmitted)
      document.getElementById(`cont-${note.id}`).innerText =
        editedNote.noteContent;
  }, [isEditIconClicked]);

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
    setIconClicked(!isEditIconClicked);

    editNote(editedNote)
      .then((result) => {
        note = result.data;
      })
      .catch((err) => console.log(err));
  };

  const onClick = () => {
    if (loggedUser.id == userId || loggedUser.isAdmin) {
      setIsClicked(!isClicked);
    } else {
      alert(`Can't edit a note that does not belong to you!`);
    }
  };

  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="note-block"
        >
          {isClicked && (
            <NoteEditForm
              note={note}
              onNoteEdit={onNoteEdit}
              onNoteSubmit={onNoteSubmit}
              isSubmitted={isSubmitted}
              editedNote={editedNote}
            />
          )}
          <div>
            <button
              style={iconsStyle}
              id="edit-icon"
              className="btn "
              type="button"
              onClick={onClick}
            >
              {editIcon}
            </button>
            <button
              style={iconsStyle}
              id="delete-icon"
              className="btn "
              type="button"
              onClick={() => onDelete(note.id)}
            >
              {deleteIcon}
            </button>
          </div>

          <div id={`cont-${note.id}`} className="note-content">
            {note.noteContent}
          </div>

          <div className="note-date">{note.dateCreated.split("T")[0]}</div>
        </div>
      )}
    </Draggable>
  );
}
