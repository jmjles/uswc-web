import { Backdrop, Fade, Modal } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { server } from "../../../../util/axios";
import SeriesForm1 from "./SeriesForm1";
import SeriesForm2 from "./SeriesForm2";

const EditSeries = ({ s, modal, handleShow, refresh }) => {
  const [title, setTitle] = useState(s.title || "");
  const [shortDesc, setShortDesc] = useState(s.short_desc || "");
  const [longDesc, setLongDesc] = useState(s.long_desc || "");
  const [subscription, setSubscription] = useState(s.subscription || false);
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState(s.tags || []);
  const [tag, setTag] = useState("");
  const [genres, setGenres] = useState(s.genres || []);
  const [genre, setGenre] = useState("");

  const [releaseDate, setReleaseDate] = useState(s.releaseDate || " ");
  const [dateAdded, setDateAdded] = useState(s.dateAdded || " ");
  const [startDate, setStartDate] = useState(s.startDate || " ");
  const [endDate, setEndDate] = useState(s.endDate || " ");

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
      case "subscription":
        setSubscription(!subscription);
        break;
      case "thumbnail":
        setThumbnail(files[0]);
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
      default:
        console.log("Wrong type");
        console.log(value);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (step === 3) {
        setLoading(true);
        const formData = new FormData();
        if (title !== s.title) formData.append("title", title);
        if (shortDesc !== s.short_desc) formData.append("shortDesc", shortDesc);
        if (longDesc !== s.long_desc) formData.append("longDesc", longDesc);

        if (subscription !== s.subscription)
          formData.append("subscription", subscription);
        if (thumbnail) formData.append("thumbnail", thumbnail);

        if (releaseDate !== s.releaseDate)
          formData.append("releaseDate", releaseDate);

        if (dateAdded !== s.dateAdded) formData.append("dateAdded", dateAdded);
        if (startDate !== s.startDate) formData.append("startDate", startDate);
        if (endDate !== s.endDate) formData.append("endDate", endDate);

        if (Array.toString(s.tags) !== Array.toString(tags))
          tags.forEach((t) => formData.append("tags", t));
        if (Array.toString(genres) !== Array.toString(s.genres))
          genres.forEach((g) => formData.append("genres", g));

        formData.append("id", s._id);
        await server.put("/video/series", formData, {
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
    setTitle(s.title || "");
    setShortDesc(s.short_desc || "");
    setLongDesc(s.long_desc || "");
    setSubscription(s.subscription || false);
    setThumbnail("");
    setTags(s.tags || []);
    setTag("");
    setGenres(s.genres || []);
    setGenre("");

    setReleaseDate(s.releaseDate || " ");
    setDateAdded(s.dateAdded || " ");
    setStartDate(s.startDate || " ");
    setEndDate(s.endDate || " ");

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
          <SeriesForm1
            {...commonFields}
            title={title}
            shortDesc={shortDesc}
            longDesc={longDesc}
            edit
          />
          <SeriesForm2
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
            releaseDate={releaseDate}
            dateAdded={dateAdded}
            startDate={startDate}
            endDate={endDate}
          />
        </>
      </Fade>
    </Modal>
  );
};

export default EditSeries;
