import {
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { server } from "../../../util/axios";

const NewVideo = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [file, setFile] = useState("");
  const handleChange = ({ target: { name, value, files } }) => {
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
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const myForm = document.getElementById("form");
      const inputs = [
        { name: "title", value: title },
        { name: "short_desc", value: shortDesc },
        { name: "duration", value: duration },
        { name: "language", value: language },
        { name: "subscription", value: subscription },
      ];
      const form = new FormData(myForm);
      form.delete("file");
      form.append("file",file)

      const res = await server.post("/video", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (er) {
      console.log(er);
    }
  };
  return (
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
      <Input
        type="file"
        color="primary"
        name="file"
        onChange={handleChange}
        required
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

      <Button type="submit" variant="contained">
        <Typography variant="button">Submit</Typography>
      </Button>
    </form>
  );
};

export default NewVideo;
