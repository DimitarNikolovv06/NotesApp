import axios from "axios";

const apiURL = "http://localhost:3006";

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

export async function afterDragNotes(id, notes) {
  const oldNotes = (await getNotes(id)).data;

  oldNotes.forEach((note, ind) => {
    axios
      .put(`${apiURL}/notes/${note.id}`, notes[ind])
      .then()
      .catch((err) => console.log(err));
  });
}
