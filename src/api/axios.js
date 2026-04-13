import axios from "axios";
require("dotenv").config();
const API = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true, 
});

export default API;