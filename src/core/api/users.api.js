import axios from "axios";
import { deleteNotesWithUser } from "./notes.api";

const apiURL = "https://notes-db.herokuapp.com";

export async function getAllUsers(params) {
  const allUsers = (await axios.get(`${apiURL}/users`)).data;

  if (!params) return allUsers;

  return allUsers.filter((user) =>
    user.name.toLowerCase().includes(params.toLowerCase())
  );
}

export function getUser(id) {
  return axios.get(`${apiURL}/users/${id}`);
}

export function editUser(userData) {
  if (userData.id) {
    return axios.put(`${apiURL}/users/${userData.id}`, userData);
  }

  return register(userData);
}

export async function login(userData) {
  const users = await getAllUsers();

  const loggedUser = users.find(
    (user) =>
      user.email === userData.email &&
      user.password.toString() === userData.password
  );

  if (loggedUser && loggedUser.isActive) {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    return;
  } else {
    throw new Error("Wrong credentials or blocked account.");
  }
}

export function getLoggedUser() {
  return localStorage.getItem("loggedUser");
}

export function logout() {
  localStorage.removeItem("loggedUser");
}

export async function register(userData) {
  const users = await getAllUsers();

  userData = {
    ...userData,
    isActive: true,
    isAdmin: false,
    picture: "https://picsum.photos/200/300?random=1",
  };

  if (
    users.find(
      (user) => user.email === userData.email || user.name === userData.name
    )
  ) {
    throw new Error("Email already exists");
  } else {
    return axios.post(`${apiURL}/users`, userData);
  }
}

export async function deleteUser(id) {
  await deleteNotesWithUser(id)
    .then(() => console.log("deleted"))
    .catch((err) => console.log(err));

  return axios.delete(`${apiURL}/users/${id}`);
}
