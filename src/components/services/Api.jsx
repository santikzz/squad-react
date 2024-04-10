import axios from "axios";

const token = localStorage.getItem("token") || sessionStorage.getItem("token");

const api = axios.create({
  baseURL: "http://squad.ddns.net/api/v1",
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default api;
