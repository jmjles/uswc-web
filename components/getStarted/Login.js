import { TextField, Button, Typography as Font } from "@material-ui/core";
import { useState } from "react";
import { server } from "../../util/axios";
const Login = ({ style }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.log("Unknown value");
    }
    console.log(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await server.post("/user/login", { username, password });
      console.log(res);
    } catch (er) {
      console.log(er.response);
    }
  };
  return (
    <form className="Login" style={style && style} onSubmit={handleSubmit}>
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
      <Button type="submit" variant="contained" color="primary">
        <Font variant="button">Submit</Font>
      </Button>
    </form>
  );
};
export default Login;
