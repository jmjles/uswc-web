import React, { useEffect, useState } from "react";
import { server } from "../../../util/axios";

const EditInfoF = ({ user: [user, setUser] }) => {
  const [fname, setFName] = useState(user.fname || "");
  const [lname, setLName] = useState(user.lname || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [zip, setZip] = useState(user.zip || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    setFName(user.fname || "");
    setLName(user.lname || "");
    setUsername(user.username || "");
    setEmail(user.email || "");
    setGender(user.gender || "");
    setAge(user.age || "");
    setPhone(user.phone || "");
    setZip(user.zip || "");
  }, [user]);

  const handleChange = ({ target: { value, name } }) => {
    if (message) setMessage(false);
    switch (name) {
      case "fname":
        setFName(value);
        break;
      case "lname":
        setLName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "age":
        setAge(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "zip":
        setZip(value);
        break;
      default:
        console.log(`Incorrect name value: ${name}`);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      if (fname !== user.fname) formData.append("fname", fname);
      if (lname !== user.lname) formData.append("lname", lname);
      if (username !== user.username) formData.append("username", username);
      if (email !== user.email) formData.append("email", email);
      if (phone !== user.phone) formData.append("phone", phone);
      if (age !== user.age) formData.append("age", age);
      if (gender !== user.gender) formData.append("gender", gender);
      if (zip !== user.zip) formData.append("zip", zip);
      formData.append("id", user._id);
      const res = await server().put("/users", formData, {
        headers: { "Content-Type": "multipart/formData-data" },
      });
      console.log(res.data);
      localStorage.setItem("TOKEN", res.data.token);
      setUser(res.data.user);
      setSuccess(true);
      setMessage(true);
      setLoading(false);
    } catch (er) {
      setSuccess(false);
      setMessage(true);
      setLoading(false);
      console.log(er);
    }
  };
  return {
    fname,
    lname,
    username,
    email,
    gender,
    age,
    phone,
    zip,
    loading,
    message,
    success,
    handleChange,
    handleSubmit,
  };
};

export default EditInfoF;
