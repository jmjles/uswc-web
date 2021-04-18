import {
  TextField,
  Typography as Font,
  Grid,
  FormControlLabel,
  Collapse,
  CircularProgress,
  Input,
  Chip,
  Button,
  Checkbox,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React from "react";
import VideoNavForm from "./VideoNavForm";

const VideoForm3 = ({
  step: [step, setStep],
  handleChange,
  handleSubmit,
  loading,
  tagField,
  tag,
  tags,
  genreField,
  genre,
  genres,
  handleAdd,
  handleAddGenre,
  handleDelete,
  handleDeleteGenre,
  show,
  created,
  subscription,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit} className={step === 3 ? "Active" : ""}>
      <Font variant="h1" style={{ marginBottom: "20px" }}>
        Submit Video
      </Font>
      <div
        style={
          loading
            ? { textAlign: "center", marginBottom: "20px" }
            : { display: "none" }
        }
      >
        <CircularProgress color="primary" />
      </div>
      <Font variant="h6">Video File</Font>
      <Input
        type="file"
        color="primary"
        name="file"
        onChange={handleChange}
        required={!edit}
      />
      <Font variant="h6">Thumbnail</Font>
      <Input
        type="file"
        color="primary"
        required={!edit}
        name="thumbnail"
        onChange={handleChange}
      />
      <Font variant="h6">Trick Play File</Font>
      <Input
        type="file"
        color="primary"
        name="trick"
        required={!edit}
        onChange={handleChange}
      />
      <Grid container alignItems="flex-end">
        <Grid item>
          <TextField
            name="tag"
            inputRef={tagField}
            label="Tag"
            value={tag}
            onChange={handleChange}
            color="primary"
            type="text"
          />
        </Grid>
        <Grid item>
          <Button color="primary" size="small" onClick={handleAdd}>
            <Add />
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {tags.map((t) => (
          <Grid item key={t}>
            <Chip label={t} onDelete={() => handleDelete(t)} color="primary" />
          </Grid>
        ))}
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item>
          <TextField
            name="genre"
            inputRef={genreField}
            label="Genre"
            value={genre}
            onChange={handleChange}
            color="primary"
            type="text"
          />
        </Grid>
        <Grid item>
          <Button color="primary" size="small" onClick={handleAddGenre}>
            <Add />
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {genres.map((t) => (
          <Grid item key={t}>
            <Chip
              label={t}
              onDelete={() => handleDeleteGenre(t)}
              color="primary"
            />
          </Grid>
        ))}
      </Grid>
      <FormControlLabel
        label="Subscription"
        labelPlacement="start"
        name="subscription"
        value={subscription}
        checked={subscription}
        onChange={handleChange}
        title="Subscription"
        aria-label="Subscription"
        control={<Checkbox color="primary" />}
      />
      <Collapse in={show}>
        <Alert severity={created ? "success" : "error"}>
          {created ? "Video has been saved" : "An error has occurred"}
        </Alert>
      </Collapse>
      <VideoNavForm step={[step, setStep]} />
    </form>
  );
};

export default VideoForm3;
