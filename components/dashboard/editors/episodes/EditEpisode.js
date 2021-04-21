import { Backdrop, Fade, Modal } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { server } from "../../../../util/axios";
import EpisodeForm1 from "./EpisodeForm1";
import EpisodeForm2 from "./EpisodeForm2";
import EpisodeForm3 from "./EpisodeForm3";

const EditEpisode = ({ e, modal, handleShow, refresh, series = [] }) => {
  const [title, setTitle] = useState(e.title || "");
  const [shortDesc, setShortDesc] = useState(e.short_desc || "");
  const [longDesc, setLongDesc] = useState(e.long_desc || "");
  const [language, setLanguage] = useState(e.language || "");
  const [subscription, setSubscription] = useState(e.subscription || false);
  const [file, setFile] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [trick, setTrick] = useState("");
  const [seriesId, setSeriesId] = useState(e.seriesId || "");
  const [tags, setTags] = useState(e.tags || []);
  const [tag, setTag] = useState("");
  const [genres, setGenres] = useState(e.genres || []);
  const [genre, setGenre] = useState("");
  const [season, setSeason] = useState(e.season || "");
  const [episode, setEpisode] = useState(e.episode || "");

  const [releaseDate, setReleaseDate] = useState(e.releaseDate || " ");
  const [dateAdded, setDateAdded] = useState(e.dateAdded || " ");
  const [startDate, setStartDate] = useState(e.startDate || " ");
  const [endDate, setEndDate] = useState(e.endDate || " ");

  const [hours, setHours] = useState(Math.floor(e.duration / 60 / 60));
  const [minutes, setMinutes] = useState(
    Math.floor((e.duration - Math.floor(e.duration / 60 / 60) * 60 * 60) / 60)
  );
  const [seconds, setSeconds] = useState(
    e.duration -
      Math.floor(e.duration / 60 / 60) * 60 * 60 -
      Math.floor(
        Math.floor(
          (e.duration - Math.floor(e.duration / 60 / 60) * 60 * 60) / 60
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
      case "seriesId":
        setSeriesId(value);
        break;
      case "season":
        setSeason(value);
        break;
      case "episode":
        setEpisode(value);
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
        setLoading(true)
        const duration = hours * 60 * 60 + minutes * 60 + 1 * seconds;
        const formData = new FormData();
        if (title !== e.title) formData.append("title", title);
        if (shortDesc !== e.short_desc) formData.append("short_desc", shortDesc);
        if (longDesc !== e.long_desc) formData.append("long_desc", longDesc);
        if (duration !== e.duration) formData.append("duration", duration);

        if (language !== e.language) formData.append("language", language);
        if (subscription !== e.subscription)
          formData.append("subscription", subscription);

        if (file) formData.append("file", file);
        if (thumbnail) formData.append("thumbnail", thumbnail);
        if (trick) formData.append("trick", trick);

        if (episode !== e.episode) formData.append("episode", episode);
        if (seriesId !== e.seriesId) formData.append("seriesId", seriesId);
        if (season !== e.season) formData.append("season", season);
        if (releaseDate !== e.releaseDate)
          formData.append("releaseDate", releaseDate);

        if (dateAdded !== e.dateAdded) formData.append("dateAdded", dateAdded);
        if (startDate !== e.startDate) formData.append("startDate", startDate);
        if (endDate !== e.endDate) formData.append("endDate", endDate);

        if (Array.toString(e.tags) !== Array.toString(tags))
          tags.forEach((t) => formData.append("tags", t));
        if (Array.toString(genres) !== Array.toString(e.genres))
          genres.forEach((g) => formData.append("genres", g));

        formData.append("id", e._id);

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
    setTitle(e.title || "");
    setShortDesc(e.short_desc || "");
    setLongDesc(e.long_desc || "");
    setLanguage(e.language || "");
    setSubscription(e.subscription || false);
    setFile("");
    setThumbnail("");
    setTrick("");
    setSeriesId(e.seriesId || "");
    setTags(e.tags || []);
    setTag("");
    setGenres(e.genres || []);
    setGenre("");
    setSeason(e.season || "");
    setEpisode(e.episode || "");

    setReleaseDate(e.releaseDate || " ");
    setDateAdded(e.dateAdded || " ");
    setStartDate(e.startDate || " ");
    setEndDate(e.endDate || " ");

    setHours(Math.floor(e.duration / 60 / 60));
    setMinutes(
      Math.floor((e.duration - Math.floor(e.duration / 60 / 60) * 60 * 60) / 60)
    );
    setSeconds(
      e.duration -
        Math.floor(e.duration / 60 / 60) -
        Math.floor(
          Math.floor(
            (e.duration - Math.floor(e.duration / 60 / 60) * 60 * 60) / 60
          ) * 60
        )
    );

    setCreated(false);
    setShow(false);
    setLoading(false);
    setStep(1);
  };
  
  const commonFields = { step: [step, setStep], handleChange, handleSubmit };
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
          <EpisodeForm1
            {...commonFields}
            title={title}
            shortDesc={shortDesc}
            longDesc={longDesc}
            season={season}
            episode={episode}
            seriesId={seriesId}
            series={series}
            edit
          />
          <EpisodeForm2
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
          <EpisodeForm3
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

export default EditEpisode;
