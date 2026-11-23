import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://ai-interview-platform-1-y4go.onrender.com",
  withCredentials: true,
});

export default api;
