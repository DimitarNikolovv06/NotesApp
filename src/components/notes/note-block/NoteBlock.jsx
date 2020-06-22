import React, { useState } from "react";
import { NoteEditForm } from "./NoteEditForm";
import { useEffect } from "react";
import { editNote } from "../../../core/api/notes.api";
import { getLoggedUser } from "../../../core/api/users.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

export function NoteBlock({ note, onDelete, userId, index }) {
  const loggedUser = JSON.parse(getLoggedUser());
  const [editedNote, setEditedNote] = useState({ ...note });
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditIconClicked, setEditIconClicked] = useState(false);
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
    document.getElementById(`cont-${note.id}`).innerText =
      editedNote.noteContent;

    setSubmitted(false);
  }, [isSubmitted, editedNote.noteContent, note.id]);

  const onNoteEdit = (event) => {
    event.persist();

    setEditedNote((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onNoteSubmit = (event) => {
    event.preventDefault();

    editNote(editedNote)
      .then((result) => {
        note = result.data;
      })
      .catch((err) => console.log(err));

    setEditIconClicked(false);
    setSubmitted(true);
  };

  const onClick = () => {
    if (loggedUser.id == userId || loggedUser.isAdmin) {
      setEditIconClicked(!isEditIconClicked);
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
          {isEditIconClicked && (
            <NoteEditForm
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
              type="button"
              onClick={onClick}
            >
              {editIcon}
            </button>
            <button
              style={iconsStyle}
              id="delete-icon"
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
