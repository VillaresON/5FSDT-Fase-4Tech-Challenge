import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.exemplo-blog.com", // fictício
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});