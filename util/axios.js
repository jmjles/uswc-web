import axios from "axios";
const dev = "https://us-weed-channel-server.herokuapp.com/vimeo";
const prod = "https://api.usweedchannel.com/vimeo";

const vimeoURL = dev
const devURL = "http://localhost:5000/vimeo";

export const vimeo = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? devURL : vimeoURL,
});
