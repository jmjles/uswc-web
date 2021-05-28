import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography as Font,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import RegisterF from "./RegisterF";

const Register = (props) => {
  const {
    style,
    type: [type, setType],
  } = props;
  const {
    handleChange,
    handleShow,
    handleSubmit,
    firstName,
    lastName,
    loading,
    email,
    username,
    password,
    tel,
    show,
    confirm,
  } = RegisterF({ ...props });
  return (
    <form className="Register" style={style && style} onSubmit={handleSubmit}>
      <Font variant="h1">Register</Font>
      <div style={loading ? { textAlign: "center" } : { display: "none" }}>
        <CircularProgress color="primary" hidden={loading} />
      </div>
      <TextField
        name="firstName"
        type="text"
        required
        label="First Name"
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
        label="Last Name"
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
        label="Email"
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
        label="Username"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={username}
      />
      <TextField
        name="password"
        type={show ? "text" : "password"}
        required
        label="Password"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShow}
                edge="end"
              >
                {!show ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name="confirm"
        type={show ? "text" : "password"}
        required
        label="Confirm Password"
        variant="standard"
        color="primary"
        variant="standard"
        onChange={handleChange}
        value={confirm}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShow}
                edge="end"
              >
                {!show ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name="tel"
        type="tel"
        required
        label="Phone #"
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
        Already have an account? Click{" "}
        <b onClick={() => setType("login")}>here</b>
      </Font>
    </form>
  );
};

export default Register;
