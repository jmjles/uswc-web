import { useRouter } from "next/router";
import { useState } from "react";
import { server } from "../../../util/axios";

const LoginF = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = ({ target: { name, value } }) => {
    if (error) setError(false);
    switch (name) {
      case "username":
        setUsername(value.toLowerCase().trim());
        break;
      case "password":
        setPassword(value.trim());
        break;
      default:
        console.log("Unknown value");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await server().post("/auth/login", { username, password });
      setLoading(false);
      localStorage.setItem("TOKEN", res.data.token);
      props.user[1](res.data.user);
    } catch (er) {
      setError(true);
      setLoading(false);
      console.log(er);
    }
  };
  return {
    handleSubmit,
    handleChange,
    username,
    password,
    error,
    loading,
    router,
  };
};

export default LoginF;
