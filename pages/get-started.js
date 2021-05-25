import { Button, createStyles, Typography as Font } from "@material-ui/core";
import GetStartedF from "../components/getStarted/GetStartedF";
import Login from "../components/getStarted/login/Login";
import Register from "../components/getStarted/register/Register";
import Content from "../layout/Content";

const getStarted = (props) => {
  const { type, handleType, setType, handleUser } = GetStartedF(props);
  handleUser;
  return (
    <Content className="GetStarted" title="Get Started">
      <section style={type !== "none" ? styles.hidden : {}}>
        <Font variant="h1">
          Click register to subscribe with U.S. Weed Channel
        </Font>
        <div className="buttonContainer">
          <Button
            variant="contained"
            target="register"
            onClick={() => handleType("register")}
            color="primary"
          >
            <Font variant="button">Register</Font>
          </Button>
          <Button
            variant="contained"
            target="login"
            onClick={() => handleType("login")}
            color="primary"
          >
            <Font variant="button">Login</Font>
          </Button>
        </div>
      </section>
      <Register
        style={type !== "register" ? styles.hidden : {}}
        type={[type, setType]}
        token={props.token}
        user={props.user}
      />
      <Login
        style={type !== "login" ? styles.hidden : {}}
        type={[type, setType]}
        token={props.token}
        user={props.user}
      />
    </Content>
  );
};
const styles = createStyles({
  hidden: {
    display: "none",
  },
});
export default getStarted;
