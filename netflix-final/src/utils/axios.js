import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "1cc28d7cb8202fa7566afa90c4a8b9f4",
  },
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;
