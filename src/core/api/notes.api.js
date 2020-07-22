import axios from "axios";

const apiURL = "https://notes-db.herokuapp.com";

export function getNotes(id) {
  return axios.get(`${apiURL}/notes?authorId=${id}`);
}

export function makeNote(note) {
  return axios.post(`${apiURL}/notes/`, note);
}

export function deleteNote(id) {
  return axios.delete(`${apiURL}/notes/${id}`);
}

export function editNote(noteData) {
  return axios.put(`${apiURL}/notes/${noteData.id}`, noteData);
}

export function getNoteById(id) {
  return axios.get(`${apiURL}/notes/${id}`);
}

export async function deleteNotesWithUser(userId) {
  const notes = (await getNotes(userId)).data;

  return notes.forEach((note) => deleteNote(note.id));
}

export async function afterDrag(userId, notes) {
  const oldNotes = (await getNotes(userId)).data;
  const notesPromises = oldNotes.map((note, i) =>
    axios.put(`${apiURL}/notes/${note.id}`, notes[i])
  );

  await Promise.all(notesPromises);
}
