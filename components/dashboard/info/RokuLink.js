import {
  Button,
  CircularProgress,
  Collapse,
  TextField,
  Typography as Font,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import RokuLinkF from "./RokuLinkF";

const RokuLink = (props) => {
  const { user:[user] } = props;
  const { handleChange, handleSubmit, code, loading, message, success } =
    RokuLinkF({ ...props });

  return (
    <div style={{maxWidth:"200px"}}>
      {user.device ? (
        <Alert severity="success">Accounts are Linked!</Alert>
      ) : (
        <form onSubmit={handleSubmit} className="Active">
          <Font variant="h2" align="center">Enter code from Roku</Font>
          {loading && <CircularProgress color="primary" />}
          <TextField
            type="text"
            label="Code"
            onChange={handleChange}
            value={code}
          />
          <Collapse in={message}>
            <Alert severity={success ? "success" : "error"}>
              {success ? "Accounts Linked!" : "An error has occurred"}
            </Alert>
          </Collapse>
          <Button variant="contained" color="primary" type="submit">
            <Font variant="button">Submit</Font>
          </Button>
        </form>
      )}
    </div>
  );
};

export default RokuLink;
