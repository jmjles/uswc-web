import { useState } from "react";
import { server } from "../../../util/axios";

const RegisterF = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [tel, setTel] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(!show);
  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "firstName":
        setFirstName(value.trim());
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value.toLowerCase().trim());
        break;
      case "username":
        setUsername(value.toLowerCase().trim());
        break;
      case "password":
        setPassword(value.trim());
        break;
      case "confirm":
        setConfirm(value.trim());
        break;
      case "tel":
        setTel(value.trim());
        break;
      default:
        console.log("Unknown value");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirm) {
      try {
        const res = await server.post("/auth/register", {
          firstName,
          lastName,
          email,
          username,
          password,
          tel,
        });
        localStorage.setItem("TOKEN", res.data.token);

      } catch (er) {
        console.log(er.response);
      }
    }
  };
  return {
    firstName,
    lastName,
    email,
    username,
    password,
    confirm,
    tel,
    show,
    loading,
    handleShow,
    handleSubmit,
    handleChange,
  };
};

export default RegisterF;
