import {
  TextField,
  Button,
  Typography as Font,
  Collapse,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LoginF from "./LoginF";

const Login = ({ style, type: [type, setType], user }) => {
  const {
    username,
    loading,
    password,
    error,
    handleSubmit,
    handleChange,
  } = LoginF({ user });
  return (
    <form className="Login" style={style && style} onSubmit={handleSubmit}>
      <Font variant="h1">Login</Font>
      <div style={loading ? { textAlign: "center" } : { display: "none" }}>
        <CircularProgress color="primary" hidden={loading} />
      </div>
      <TextField
        name="username"
        type="text"
        required
        label="Username"
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
        label="Password"
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
