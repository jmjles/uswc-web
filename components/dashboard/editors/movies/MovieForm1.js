import { TextField, Typography as Font } from "@material-ui/core";
import React from "react";
import MovieNavForm from "./MovieNavForm";
const MovieForm1 = ({
  step: [step, setStep],
  title,
  longDesc,
  shortDesc,
  handleChange,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit} className={step === 1 ? "Active" : ""}>
      <Font variant="h1" style={{ marginBottom: "20px" }}>
        {edit ? "Edit Movie" : "New Movie"}
      </Font>
      <TextField
        name="title"
        value={title}
        id="title"
        required
        color="primary"
        type="text"
        label="Title"
        onChange={handleChange}
      />
      <TextField
        name="long_desc"
        label="Long Description"
        value={longDesc}
        onChange={handleChange}
        required
        color="primary"
        type="text"
        multiline
        rows="3"
        rowsMax="3"
      />
      <TextField
        name="short_desc"
        label="Short Description"
        value={shortDesc}
        onChange={handleChange}
        required
        color="primary"
        type="text"
        multiline
        rows="3"
        rowsMax="3"
      />
      <MovieNavForm step={[step, setStep]} />
    </form>
  );
};

export default MovieForm1;
