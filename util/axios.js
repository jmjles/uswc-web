import axios from "axios";

const vimeoURL = "https://api.usweedchannel.com/vimeo";
const devURL = "http://localhost:5000/vimeo";
export const vimeo = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? devURL : vimeoURL,
});
