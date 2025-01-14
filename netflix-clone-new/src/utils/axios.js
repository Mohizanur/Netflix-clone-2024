import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Fixed 'baseURL' typo
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;
