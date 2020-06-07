import axios from "axios";

const apiURL = "http://localhost:3005";

export function getAllUsers() {
  return axios.get(`${apiURL}/users`);
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
  const users = (await getAllUsers()).data;

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
  const users = (await getAllUsers()).data;

  userData = {
    ...userData,
    isActive: true,
    isAdmin: false,
    picture: "https://picsum.photos/200/300?random=1",
  };

  if (users.find((user) => user.email === userData.email)) {
    throw new Error("Email already exists");
  } else {
    return axios.post(`${apiURL}/users`, userData);
  }
}

export function deleteUser(id) {
  return axios.delete(`${apiURL}/users/${id}`);
}
