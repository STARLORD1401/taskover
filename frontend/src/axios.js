import axios from "axios";

const instance = axios.create({
  baseURL: "https://taskover.onrender.com/",
});
export default instance;
