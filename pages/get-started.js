import { Button, createStyles, Typography as Font } from "@material-ui/core";
import { useState } from "react";
import Login from "../components/getStarted/Login";
import Register from "../components/getStarted/Register";
import Wip from "../components/Wip";
import Page from "../layout/Page";

const getStarted = () => {
  const [type, setType] = useState("none");
  const handleType = (type) => setType(type);
  return (
    <Page className="GetStarted" title="Get Started">
      <div style={type !== "none" ? styles.hidden : {}}>
        <Font variant="h1">Get started with U.S. Weed Channel</Font>
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
      <Register style={type !== "register" ? styles.hidden : {}} />
      <Login style={type !== "login" ? styles.hidden : {}} />
    </Page>
  );
};
const styles = createStyles({
  hidden: {
    display: "none",
  },
});
export default getStarted;
