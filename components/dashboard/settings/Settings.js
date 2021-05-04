import { Button, Typography as Font } from "@material-ui/core";
import React from "react";
import settingsF from "./settingsF";

const Settings = (props) => {
  const { handleLogout } = settingsF(props);
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        <Font variant="button">Logout</Font>
      </Button>
    </div>
  );
};

export default Settings;
