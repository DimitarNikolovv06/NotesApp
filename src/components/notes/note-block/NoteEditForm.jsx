import React from "react";

export function NoteEditForm({
  note,
  onNoteEdit,
  onNoteSubmit,
  isSubmitted,
  editedNote,
}) {
  return (
    <>
      {!isSubmitted && (
        <div>
          <form
            onSubmit={(event) => onNoteSubmit(event)}
            style={{ background: "none" }}
            type="submit"
          >
            <input
              className="form-control btn-outline-info"
              placeholder={note.noteContent}
              type="text"
              name="noteContent"
              id="noteContent"
              style={{ background: "none" }}
              onChange={(event) => onNoteEdit(event)}
              value={editedNote.noteContent}
            />
            <button style={{ display: "none" }} type="submit"></button>
          </form>
        </div>
      )}
    </>
  );
}
