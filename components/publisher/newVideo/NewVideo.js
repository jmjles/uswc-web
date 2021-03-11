import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Input,
  TextField,
  Typography as Font,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { server } from "../../../util/axios";

const NewVideo = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [file, setFile] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [created, setCreated] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = ({ target: { name, value, files } }) => {
    if (show) setShow(false);
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "short_desc":
        setShortDesc(value);
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
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const myForm = document.getElementById("form");
      const form = new FormData(myForm);
      form.delete("file");
      form.append("file", file);

      form.delete("thumbnail");
      form.append("thumbnail", thumbnail);
      const res = await server.post("/video", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShow(true);
      res.status === 201 ? setCreated(true) : setCreated(false);
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} id="form" className="NewVideo">
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
          name="short_desc"
          placeholder="Short Description"
          value={shortDesc}
          onChange={handleChange}
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
        />
        <TextField
          name="language"
          placeholder="Language"
          value={language}
          onChange={handleChange}
          color="primary"
          type="text"
        />
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
          name="thumbnail"
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
            {created ? "Video has been saved" : "An error has occured"}
          </Alert>
        </Collapse>
        <Button type="submit" variant="contained" color="primary">
          <Font variant="button">Submit</Font>
        </Button>
      </form>
    </div>
  );
};

export default NewVideo;
