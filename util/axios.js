import axios from "axios";
const prod = "https://us-weed-channel-server.herokuapp.com";
const dev = "http://localhost:5000";

export const server = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? dev : prod,
});
