import axios from "axios";

const token = localStorage.getItem("token") || sessionStorage.getItem("token");

const api = axios.create({
  baseURL: "http://squad.ddns.net/api/v1",
  // baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default api;
