import {
  TextField,
  Button,
  Typography as Font,
  Collapse,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useState } from "react";
import { server } from "../../util/axios";
const Login = ({ style, type: [type, setType], token: [token, setToken] }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    if (error) setError(false);
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
      const res = await server.post("/auth/login", { username, password });
      setToken(res.data.token);
      router.push("/dashboard");
    } catch (er) {
      setError(true);
      console.log(er.response);
    }
  };
  return (
    <form className="Login" style={style && style} onSubmit={handleSubmit}>
      <Font variant="h1">Login</Font>
      <div>
        <CircularProgress color="primary" />
      </div>

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
        type="password"
        required
        placeholder="Password"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={password}
      />
      <Collapse in={error}>
        <Alert severity="error">Incorrect Credentials</Alert>
      </Collapse>
      <Button type="submit" variant="contained" color="primary">
        <Font variant="button">Submit</Font>
      </Button>
      <Font variant="body2">
        Need an account? Register{" "}
        <b onClick={() => setType("register")}>here</b>.
      </Font>
    </form>
  );
};
export default Login;
