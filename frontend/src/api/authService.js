import api from "./axios";

export const loginRequest = (data) => {
  return api.post("/users/login", data);
};

export const registerRequest = (data) => {
  return api.post("/users/register", data);
};

export const getProfileRequest = () => {
  return api.get("/users/me");
};