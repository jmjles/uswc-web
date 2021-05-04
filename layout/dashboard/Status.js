import { CircularProgress, Collapse, Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";

const Status = ({ loading, error }) => {
  return (
    <>
      <Collapse in={loading}>
        <Grid container justify="center">
          <Grid item>
            <CircularProgress color="primary" />
          </Grid>
        </Grid>
      </Collapse>
      <Collapse in={error}>
        <Grid container justify="center">
          <Grid item>
            <Alert severity="error">
              <AlertTitle>Network Error</AlertTitle>
              There was an error retrieving data
            </Alert>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

export default Status;
