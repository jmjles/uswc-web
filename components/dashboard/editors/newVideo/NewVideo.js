import {
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  createStyles,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography as Font,
} from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { server } from "../../../../util/axios";

const NewVideo = () => {
  const [type, setType] = useState("");

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [file, setFile] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [trick, setTrick] = useState("");
  const [seriesId, setSeriesId] = useState("");
  const [created, setCreated] = useState(false);
  const [show, setShow] = useState(false);

  const [typeClass, setTypeClass] = useState("Enter");
  const [movieClass, setMovieClass] = useState("Hidden");
  const [filmClass, setFilmClass] = useState("Hidden");
  const [episodeClass, setEpisodeClass] = useState("Hidden");
  const [series, setSeries] = useState([]);
  const [seriesNumber, setSeriesNumber] = useState("");
  const [episode, setEpisode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSeries = async () => {
      try {
        const s = await server("/video/series");
        setSeries(s.data);
        console.log(s.data);
      } catch (er) {
        console.log(er);
      }
    };
    getSeries();
  }, []);
  const handleChange = ({ target: { name, value, files } }) => {
    if (show) setShow(false);
    switch (name) {
      case "type":
        setType(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "short_desc":
        setShortDesc(value);
        break;
      case "long_desc":
        setLongDesc(value);
        break;
      case "duration":
        setDuration(value);
        break;
      case "language":
        setLanguage(value);
        break;
      case "subscription":
        setSubscription(!subscription);
        break;
      case "file":
        setFile(files[0]);
        break;
      case "thumbnail":
        setThumbnail(files[0]);
        break;
      case "trick":
        setTrick(files[0]);
        break;
      case "seriesId":
        setSeriesId(value);
        break;
      case "series":
        setSeriesNumber(value);
        break;
      case "episode":
        setEpisode(value);
        break;
      default:
        console.log("Wrong type");
        console.log(type);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let myForm;
      switch (type) {
        case "movie":
          myForm = document.getElementById("MovieForm");
          break;
        case "episode":
          myForm = document.getElementById("EpisodeForm");
          break;
        case "shortFormVideo":
          myForm = document.getElementById("ShortVideoForm");
          break;
        default:
          console.log("Wrong type");
          console.log(type);
      }
      const form = new FormData(myForm);
      form.delete("file");
      form.append("file", file);

      form.delete("thumbnail");
      form.append("thumbnail", thumbnail);

      form.delete("trick");
      form.append("trick", trick);

      form.append("type", type);
      await server.post("/video", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      setShow(true);
      setCreated(true);
    } catch (er) {
      setCreated(false);
      setLoading(false);
      console.log(er);
    }
  };

  const handleTypeForm = (e) => {
    e.preventDefault();
    setTypeClass("Exit");
    switch (type) {
      case "movie":
        setMovieClass("Enter");
        break;
      case "episode":
        setEpisodeClass("Enter");
        break;
      case "shortFormVideo":
        setFilmClass("Enter");
        break;
      default:
        console.log("Invalid type");
        console.log(type);
    }
  };

  const VideoType = (
    <form className={typeClass} onSubmit={handleTypeForm} id="VideoTypeForm">
      <Font variant="h2">What are you uploading?</Font>
      <RadioGroup value={type} name="type" onChange={handleChange}>
        <FormControlLabel
          control={<Radio required />}
          label="Movie"
          value="movie"
        />
        <FormControlLabel control={<Radio />} label="Episode" value="episode" />
        <FormControlLabel
          control={<Radio />}
          label="Short Film"
          value="shortFormVideo"
        />
      </RadioGroup>
      <Button variant="contained" color="primary" type="submit">
        <Font variant="button">Next</Font>
        <NavigateNext />
      </Button>
    </form>
  );

  const commonFields = (
    <>
      <div style={loading ? { textAlign: "center" } : { display: "none" }}>
        <CircularProgress color="primary" />
      </div>
      <TextField
        name="title"
        value={title}
        id="title"
        required
        color="primary"
        type="text"
        placeholder="Title"
        onChange={handleChange}
      />
      <TextField
        name="long_desc"
        placeholder="Long Description"
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
        placeholder="Short Description"
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
        name="duration"
        placeholder="Duration"
        value={duration}
        onChange={handleChange}
        color="primary"
        type="number"
        required
      />
      <TextField
        name="language"
        placeholder="Language"
        value={language}
        onChange={handleChange}
        color="primary"
        type="text"
      />

      <Font variant="h6">Release Date</Font>
      <Input type="date" color="primary" name="releaseDate" />

      <Font variant="h6">Date Added</Font>
      <Input type="date" color="primary" name="dateAdded" />

      <Font variant="h6">Video File</Font>
      <Input
        type="file"
        color="primary"
        name="file"
        onChange={handleChange}
        required
      />
      <Font variant="h6">Thumbnail</Font>
      <Input
        type="file"
        color="primary"
        required
        name="thumbnail"
        onChange={handleChange}
      />
      <Font variant="h6">Trick Play File</Font>
      <Input
        type="file"
        color="primary"
        name="trick"
        required
        onChange={handleChange}
      />
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
    </>
  );

  const episodeForm = (
    <form className={episodeClass} id="EpisodeForm" onSubmit={handleSubmit}>
      <Font variant="h1">Episode Form</Font>
      {commonFields}
      <Select
        control={<Select required />}
        label="Series: "
        name="seriesId"
        labelPlacement="start"
        required
        value={seriesId}
        onChange={handleChange}
        title="Series"
        placeholder="Series"
      >
        {series.map((s) => (
          <MenuItem value={s._id}>{s.title}</MenuItem>
        ))}
      </Select>
      <TextField
        name="series"
        placeholder="Series Number"
        value={seriesNumber}
        onChange={handleChange}
        required
        color="primary"
        type="number"
      />
      <TextField
        name="episode"
        placeholder="Episode Number"
        value={episode}
        onChange={handleChange}
        required
        color="primary"
        type="number"
      />
      <Grid container justify="space-between">
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setEpisodeClass("Back");
              setTypeClass("Enter");
            }}
          >
            <NavigateBefore />
            <Font>Back</Font>
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            <Font variant="button">Submit</Font>
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const movieForm = (
    <form className={movieClass} id="MovieForm" onSubmit={handleSubmit}>
      <Font variant="h1">Movie Form</Font>
      {commonFields}
      <Grid container justify="space-between">
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setMovieClass("Back");
              setTypeClass("Enter");
            }}
          >
            <NavigateBefore />
            <Font>Back</Font>
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            <Font variant="button">Submit</Font>
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const shortForm = (
    <form className={filmClass} onSubmit={handleSubmit} id="ShortVideoForm">
      <Font variant="h1">Short Film Form</Font>
      {commonFields}
      <Grid container justify="space-between">
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setFilmClass("Back");
              setTypeClass("Enter");
            }}
          >
            <NavigateBefore />
            <Font>Back</Font>
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            <Font variant="button">Submit</Font>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
  return (
    <div className="NewVideo">
      {VideoType}
      {movieForm}
      {episodeForm}
      {shortForm}
    </div>
  );
};

const style = createStyles({
  hidden: { display: "none" },
});
export default NewVideo;
