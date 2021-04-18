import { Backdrop, Fade, Modal } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { server } from "../../../../util/axios";
import VideoForm1 from "./VideoForm1";
import VideoForm2 from "./VideoForm2";
import VideoForm3 from "./VideoForm3";

const EditVideo = ({ v, modal, handleShow, refresh }) => {
  const [title, setTitle] = useState(v.title || "");
  const [shortDesc, setShortDesc] = useState(v.short_desc || "");
  const [longDesc, setLongDesc] = useState(v.long_desc || "");
  const [language, setLanguage] = useState(v.language || "");
  const [subscription, setSubscription] = useState(v.subscription || false);
  const [file, setFile] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [trick, setTrick] = useState("");
  const [tags, setTags] = useState(v.tags || []);
  const [tag, setTag] = useState("");
  const [genres, setGenres] = useState(v.genres || []);
  const [genre, setGenre] = useState("");

  const [releaseDate, setReleaseDate] = useState(v.releaseDate || " ");
  const [dateAdded, setDateAdded] = useState(v.dateAdded || " ");
  const [startDate, setStartDate] = useState(v.startDate || " ");
  const [endDate, setEndDate] = useState(v.endDate || " ");

  const [hours, setHours] = useState(Math.floor(v.duration / 60 / 60));
  const [minutes, setMinutes] = useState(
    Math.floor((v.duration - Math.floor(v.duration / 60 / 60) * 60 * 60) / 60)
  );
  const [seconds, setSeconds] = useState(
    v.duration -
      Math.floor(v.duration / 60 / 60) * 60 * 60 -
      Math.floor(
        Math.floor(
          (v.duration - Math.floor(v.duration / 60 / 60) * 60 * 60) / 60
        ) * 60
      )
  );

  const [created, setCreated] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const tagField = useRef();
  const genreField = useRef();

  const handleDelete = (key) => setTags(tags.filter((t) => t !== key));
  const handleDeleteGenre = (key) => setGenres(genres.filter((g) => g !== key));

  const handleAdd = () => {
    const value = tagField.current.value;
    if (value.length > 1) {
      setTags([...tags, value]);
      setTag("");
    }
  };

  const handleAddGenre = () => {
    const value = genreField.current.value;
    if (value.length > 1) {
      setGenres([...genres, value]);
      setGenre("");
    }
  };

  const handleChange = ({ target: { name, value, files } }) => {
    if (show) setShow(false);
    switch (name) {
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
      case "tag":
        setTag(value.trim().toLowerCase());
        break;
      case "genre":
        setGenre(value.trim().toLowerCase());
        break;
      case "releaseDate":
        setReleaseDate(value);
        break;
      case "dateAdded":
        setDateAdded(value);
        break;
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "hours":
        setHours(value);
        break;
      case "minutes":
        setMinutes(value);
        break;
      case "seconds":
        setSeconds(value);
        break;
      default:
        console.log("Wrong type");
        console.log(value);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (step === 3) {
        const duration = hours * 60 * 60 + minutes * 60 + 1 * seconds;
        const formData = new FormData();
        if (title !== v.title) formData.append("title", title);
        if (shortDesc !== v.short_desc) formData.append("shortDesc", shortDesc);
        if (longDesc !== v.long_desc) formData.append("longDesc", longDesc);
        if (duration !== v.duration) formData.append("duration", duration);

        if (language !== v.language) formData.append("language", language);
        if (subscription !== v.subscription)
          formData.append("subscription", subscription);

        if (file) formData.append("file", file);
        if (thumbnail) formData.append("thumbnail", thumbnail);
        if (trick) formData.append("trick", trick);

        if (episode !== v.episode) formData.append("episode", episode);
        if (seriesId !== v.seriesId) formData.append("seriesId", seriesId);
        if (season !== v.season) formData.append("season", season);
        if (releaseDate !== v.releaseDate)
          formData.append("releaseDate", releaseDate);

        if (dateAdded !== v.dateAdded) formData.append("dateAdded", dateAdded);
        if (startDate !== v.startDate) formData.append("startDate", startDate);
        if (endDate !== v.endDate) formData.append("endDate", endDate);

        if (Array.toString(v.tags) !== Array.toString(tags))
          tags.forEach((t) => formData.append("tags", t));
        if (Array.toString(genres) !== Array.toString(v.genres))
          genres.forEach((g) => formData.append("genres", g));
        formData.append("id", v._id);
        await server.put("/video", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setLoading(false);
        await refresh();
        setShow(true);
        setCreated(true);
        setTimeout(() => handleShow(Reset), 3000);
      } else {
        setStep(step + 1);
      }
    } catch (er) {
      setShow(true);
      setCreated(false);
      setLoading(false);
      console.log(er);
    }
  };

  const Reset = () => {
    setTitle(v.title || "");
    setShortDesc(v.short_desc || "");
    setLongDesc(v.long_desc || "");
    setLanguage(v.language || "");
    setSubscription(v.subscription || false);
    setFile("");
    setThumbnail("");
    setTrick("");
    setTags(v.tags || []);
    setTag("");
    setGenres(v.genres || []);
    setGenre("");

    setReleaseDate(v.releaseDate || " ");
    setDateAdded(v.dateAdded || " ");
    setStartDate(v.startDate || " ");
    setEndDate(v.endDate || " ");

    setHours(Math.floor(v.duration / 60 / 60));
    setMinutes(
      Math.floor((v.duration - Math.floor(v.duration / 60 / 60) * 60 * 60) / 60)
    );
    setSeconds(
      v.duration -
        Math.floor(v.duration / 60 / 60) -
        Math.floor(
          Math.floor(
            (v.duration - Math.floor(v.duration / 60 / 60) * 60 * 60) / 60
          ) * 60
        )
    );

    setCreated(false);
    setShow(false);
    setLoading(false);
    setStep(1);
  };
  const commonFields = {
    step: [step, setStep],
    handleChange,
    handleSubmit,
  };
  return (
    <Modal
      open={modal}
      onClose={() => handleShow(Reset)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      className="Modal"
    >
      <Fade in={modal}>
        <>
          <VideoForm1
            {...commonFields}
            title={title}
            shortDesc={shortDesc}
            longDesc={longDesc}
            edit
          />
          <VideoForm2
            {...commonFields}
            language={language}
            releaseDate={releaseDate}
            dateAdded={dateAdded}
            startDate={startDate}
            endDate={endDate}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            edit
          />
          <VideoForm3
            {...commonFields}
            loading={loading}
            show={show}
            created={created}
            tag={tag}
            tagField={tagField}
            tags={tags}
            genre={genre}
            genreField={genreField}
            genres={genres}
            handleAdd={handleAdd}
            handleAddGenre={handleAddGenre}
            handleDelete={handleDelete}
            handleDeleteGenre={handleDeleteGenre}
            subscription={subscription}
            edit
          />
        </>
      </Fade>
    </Modal>
  );
};

export default EditVideo;
