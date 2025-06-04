import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5555",
  withCredentials: true,    
});

export const registerUser = (data) => API.post("/Auth/register", data);
export const loginUser = (data) => API.post("/Auth/login", data);
