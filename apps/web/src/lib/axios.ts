import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  timeout: 60000 * 5, // 5 munites
  headers: {
    "Content-Type": "application/json",
  },
});
