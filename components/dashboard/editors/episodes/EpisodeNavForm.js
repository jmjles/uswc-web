import { Button, Grid, Typography as Font } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import React from "react";

const EpisodeNavForm = ({ step: [step, setStep] }) => {
  const prevStep = () => setStep(step - 1);
  return (
    <Grid
      container
      justify={step === 1 ? "flex-end" : "space-around"}
      className="Nav"
    >
      {step !== 1 && (
        <Grid item>
          <Button color="primary" variant="contained" onClick={prevStep}>
            <NavigateBefore />
            <Font variant="button">Prev</Font>
          </Button>
        </Grid>
      )}
      {step !== 3 ? (
        <Grid item>
          <Button color="primary" variant="contained" type="submit">
            <Font variant="button">Next </Font>
            <NavigateNext />
          </Button>
        </Grid>
      ) : (
        <Grid item>
          <Button color="primary" variant="contained" type="submit">
            <Font variant="button">Submit</Font>
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default EpisodeNavForm;
