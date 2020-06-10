import axios from "axios";
import { getUser } from "./users.api";

const apiURL = "http://localhost:3005";

export async function getNotes(userId) {
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

export function getNoteById(id) {
  return axios.get(`${apiURL}/notes/${id}`);
}
