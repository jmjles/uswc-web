import axios from "axios";
const prod = "https://us-weed-channel-server.herokuapp.com";
const dev = "http://localhost:5000";

export const server = () => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    return axios.create({
      baseURL: process.env.NODE_ENV === "development" ? dev : prod,
      headers: { authorization: token },
    });
  } else
    return axios.create({
      baseURL: process.env.NODE_ENV === "development" ? dev : prod,
    });
};
export const verify = async () => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    return await axios(
      process.env.NODE_ENV === "development"
        ? `${dev}/auth/verify`
        : `${prod}/auth/verify`,
      {
        headers: {
          authorization: token,
        },
      }
    );
  }
  return { data: false };
};
