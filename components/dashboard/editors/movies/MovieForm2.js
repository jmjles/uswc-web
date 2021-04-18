import { TextField, Typography as Font, Input, Grid } from "@material-ui/core";
import React from "react";
import MovieNavForm from "./MovieNavForm";

const MovieForm2 = ({
  step: [step, setStep],
  handleChange,
  handleSubmit,
  releaseDate,
  dateAdded,
  startDate,
  endDate,
  hours,
  minutes,
  seconds,
  language,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit} className={step === 2 ? "Active" : ""}>
      <Font variant="h1" style={{ marginBottom: "20px" }}>
        {edit ? "Edit Movie" : "New Movie"}
      </Font>
      <Grid container justify="space-around" wrap="nowrap" direction="row">
        <Grid item>
          <TextField
            label="Hr"
            name="hours"
            onChange={handleChange}
            value={hours}
            color="primary"
            type="number"
            required
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Mn"
            name="minutes"
            value={minutes}
            onChange={handleChange}
            color="primary"
            type="number"
            required
            InputProps={{ inputProps: { min: 0, max: 59 } }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Ss"
            name="seconds"
            value={seconds}
            onChange={handleChange}
            color="primary"
            type="number"
            required
            InputProps={{ inputProps: { min: 0, max: 59 } }}
          />
        </Grid>
      </Grid>
      <TextField
        name="language"
        label="Language"
        value={language}
        onChange={handleChange}
        color="primary"
        type="text"
      />
      <Font variant="h6">Release Date</Font>
      <Input
        type="date"
        color="primary"
        name="releaseDate"
        onChange={handleChange}
        value={releaseDate}
      />
      <Font variant="h6">Date Added</Font>
      <Input
        type="date"
        color="primary"
        name="dateAdded"
        onChange={handleChange}
        value={dateAdded}
      />
      <Font variant="h6">Available From</Font>
      <Input
        type="date"
        color="primary"
        name="startDate"
        required
        onChange={handleChange}
        value={startDate}
      />
      <Font variant="h6">Available To</Font>
      <Input
        type="date"
        color="primary"
        name="endDate"
        onChange={handleChange}
        value={endDate}
      />
      <MovieNavForm step={[step, setStep]} />
    </form>
  );
};

export default MovieForm2;
