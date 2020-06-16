import axios from "axios";

const apiURL = "http://localhost:3005";

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
  const notes = (await axios.get(`${apiURL}/notes?authorId=${userId}`)).data;

  return notes.map((note) => deleteNote(note.id));
}
