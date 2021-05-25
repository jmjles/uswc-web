import React, { useState } from "react";
import { server } from "../../../util/axios";

const RokuLinkF = (props) => {
  const {
    user: [user, setUser],
  } = props;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const handleChange = ({ target: { value } }) => {
    if (message) setMessage(!message);
    setCode(value);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const newUser = await server().post("/auth/link", { code, id: user._id });
      setUser(newUser.data);
      setLoading(false);
      setSuccess(true);
      setMessage(true);
    } catch {
      setSuccess(false);
      setLoading(false);
      setMessage(true);
    }
  };
  return { handleChange, code, loading, success, message, handleSubmit };
};

export default RokuLinkF;
