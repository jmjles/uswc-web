import { Button, TextField, Typography as Font } from "@material-ui/core";
import { useState } from "react";
import { server } from "../../util/axios";

const Register = ({ style, type: [type, setType] }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [tel, setTel] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirm":
        setConfirm(value);
        break;
      case "tel":
        setTel(value);
        break;
      default:
        console.log("Unknown value");
    }
    console.log(name, value);
  };

  const handleSubmit = async () => {
    if (password === confirm) {
      try {
        const res = await server.post("/user/register", {
          firstName,
          lastName,
          email,
          password,
          tel,
        });
        console.log(res);
      } catch (er) {
        console.log(er.response);
      }
    }
  };
  return (
    <form className="Register" style={style && style} onSubmit={handleSubmit}>
      <Font variant="h1">Register</Font>
      <TextField
        name="firstName"
        type="text"
        required
        placeholder="First Name"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={firstName}
      />
      <TextField
        name="lastName"
        type="text"
        required
        placeholder="Last Name"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={lastName}
      />
      <TextField
        name="email"
        type="text"
        required
        placeholder="Email"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={email}
      />
      <TextField
        name="username"
        type="text"
        required
        placeholder="Username"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={username}
      />
      <TextField
        name="password"
        type="text"
        required
        placeholder="Password"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={password}
      />
      <TextField
        name="confirm"
        type="text"
        required
        placeholder="Confirm Password"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={confirm}
      />
      <TextField
        name="tel"
        type="tel"
        required
        placeholder="Phone #"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={tel}
      />
      <Button type="submit" variant="contained" color="primary">
        <Font variant="button">Submit</Font>
      </Button>
      <Font variant="body2">
        Already have an account? Click <b onClick={()=> setType("login")}>here</b>
      </Font>
    </form>
  );
};

export default Register;
