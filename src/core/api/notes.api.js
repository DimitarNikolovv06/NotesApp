import axios from "axios";
import { getUser } from "./users.api";

const apiURL = "http://localhost:3005";

export function getAllNotes() {
  return axios.get(`${apiURL}/notes`);
}

export async function getNotesByAuthorName(userId) {
  const user = (await getUser(userId)).data;
  return axios.get(`${apiURL}/notes?authorName=${user.name}`);
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
