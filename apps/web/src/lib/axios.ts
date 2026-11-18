import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  timeout: 60000, // 1 munite
  headers: {
    "Content-Type": "application/json",
  },
});
