import React from "react";

export function NoteEditForm({
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
              className="form-control"
              type="text"
              name="noteContent"
              id="noteContent"
              style={{
                background: "black",
                color: "white",
                boxShadow: "none",
                paddingTop: "0",
              }}
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
