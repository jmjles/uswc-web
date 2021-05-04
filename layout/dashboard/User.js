import { Avatar, Grid, Typography as Font } from "@material-ui/core";
import React from "react";

const User = ({ fname, pic }) => {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Grid container alignItems="center" justify="space-around">
          <Grid item>
            <Font variant="body1">Welcome, {fname}</Font>
          </Grid>
          <Grid item>
            <Avatar src={pic} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default User;
