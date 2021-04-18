import { TextField, Typography as Font } from "@material-ui/core";
import React from "react";
import VideoNavForm from "./VideoNavForm";

const VideoForm1 = ({
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
        {edit ? "Edit Video" : "New Video"}
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
      <VideoNavForm step={[step, setStep]} />
    </form>
  );
};

export default VideoForm1;
