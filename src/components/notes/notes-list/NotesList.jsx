import React from "react";
import { NoteBlock } from "../note-block/NoteBlock";
import { Droppable } from "react-beautiful-dnd";

export function NotesList({ userId, notes, onClickDelete }) {
  return (
    <Droppable droppableId={userId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="notes-list position-relative"
        >
          {notes.map((note, index) => (
            <NoteBlock
              note={note}
              key={note.id}
              onDelete={onClickDelete}
              userId={userId}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
