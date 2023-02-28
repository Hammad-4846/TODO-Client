import axios from "axios";

let baseURL = "http://localhost:4000/api";

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});
