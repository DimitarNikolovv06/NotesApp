import axios from "axios";

const apiURL = "http://localhost:3005";

export function getAllUsers() {
  return axios.get(`${apiURL}/users`);
}

export function getUser(id) {
  return axios.get(`${apiURL}/users/${id}`);
}
