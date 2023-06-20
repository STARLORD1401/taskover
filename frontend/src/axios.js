import axios from "axios";

const instance = axios.create({
  baseURL: "https://taskover.onrender.com/",
  // baseURL: "http://localhost:8001"
});
export default instance;
