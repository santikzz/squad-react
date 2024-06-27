import axios from "axios";

const baseURL = "http://squad-api.ddns.net/";
const token = localStorage.getItem("token") || sessionStorage.getItem("token");

const api = axios.create({
  baseURL: baseURL+"api/v1",
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export { baseURL, api as default };