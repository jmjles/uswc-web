import {
  CircularProgress,
  Collapse,
  TextField,
  Typography as Font,
  Input,
  Button,
  Grid,
  Chip,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import SeriesNavForm from "./SeriesNavForm";

const SeriesForm2 = ({
  step: [step, setStep],
  startDate,
  endDate,
  releaseDate,
  dateAdded,
  tag,
  tags,
  tagField,
  genre,
  genres,
  genreField,
  handleAdd,
  subscription,
  handleAddGenre,
  handleChange,
  handleDelete,
  handleDeleteGenre,
  handleSubmit,
  loading,
  created,
  show,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit} className={step === 2 ? "Active" : ""}>
      <Font variant="h1" style={{ marginBottom: "20px" }}>
        Submit Series
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
      <Font variant="h6">Thumbnail</Font>
      <Input
        type="file"
        color="primary"
        required={!edit}
        name="thumbnail"
        onChange={handleChange}
      />
      <Grid container>
        <Grid item>
          <TextField
            name="tag"
            inputRef={tagField}
            placeholder="Tag"
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
      <Grid container>
        <Grid item>
          <TextField
            name="genre"
            inputRef={genreField}
            placeholder="Genre"
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
          {created ? "Series has been saved" : "An error has occurred"}
        </Alert>
      </Collapse>
      <SeriesNavForm step={[step, setStep]} />
    </form>
  );
};

export default SeriesForm2;
