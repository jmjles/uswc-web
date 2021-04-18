import {
  Select,
  TextField,
  Typography as Font,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import EpisodeNavForm from "./EpisodeNavForm";
const EpisodeForm1 = ({
  step: [step, setStep],
  title,
  longDesc,
  shortDesc,
  series,
  episode,
  seriesId,
  season,
  handleChange,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit} className={step === 1 ? "Active" : ""}>
      <Font variant="h1" style={{ marginBottom: "20px" }}>
        {edit ? "Edit Episode" : "New Episode"}
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
      <TextField
        name="season"
        label="Season Number"
        value={season}
        onChange={handleChange}
        required
        color="primary"
        InputProps={{ inputProps: { min: 0 } }}
        type="number"
      />
      <TextField
        name="episode"
        label="Episode Number"
        value={episode}
        onChange={handleChange}
        required
        color="primary"
        InputProps={{ inputProps: { min: 0 } }}
        type="number"
      />
      <Select
        name="seriesId"
        required
        value={seriesId}
        onChange={handleChange}
        title="Series"
      >
        {series.map((s) => (
          <MenuItem value={s._id} key={s._id}>
            {s.title}
          </MenuItem>
        ))}
      </Select>
      <EpisodeNavForm step={[step, setStep]} />
    </form>
  );
};

export default EpisodeForm1;
