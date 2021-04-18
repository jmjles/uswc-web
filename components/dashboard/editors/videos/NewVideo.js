import { useRef, useState } from "react";
import { server } from "../../../../util/axios";
import VideoForm1 from "./VideoForm1";
import VideoForm2 from "./VideoForm2";
import VideoForm3 from "./VideoForm3";
const NewVideo = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [language, setLanguage] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [file, setFile] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [trick, setTrick] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");

  const [releaseDate, setReleaseDate] = useState(" ");
  const [dateAdded, setDateAdded] = useState(" ");
  const [startDate, setStartDate] = useState(" ");
  const [endDate, setEndDate] = useState(" ");

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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
        formData.append("title", title);
        formData.append("shortDesc", shortDesc);
        formData.append("longDesc", longDesc);
        formData.append("duration", duration);

        formData.append("language", language);

        formData.append("subscription", subscription);

        formData.append("file", file);
        formData.append("thumbnail", thumbnail);
        formData.append("trick", trick);

        formData.append("episode", episode);
        formData.append("seriesId", seriesId);
        formData.append("season", season);

        formData.append("releaseDate", releaseDate);

        formData.append("dateAdded", dateAdded);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        tags.forEach((t) => formData.append("tags", t));
        genres.forEach((g) => formData.append("genres", g));

        await server.post("/video", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setLoading(false);
        await refresh();
        setShow(true);
        setCreated(true);
        setTimeout(Reset, 3000);
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
    setTitle("");
    setShortDesc("");
    setLongDesc("");
    setLanguage("");
    setSubscription(false);
    setFile("");
    setThumbnail("");
    setTrick("");
    setTags([]);
    setTag("");
    setGenres([]);
    setGenre("");

    setReleaseDate(" ");
    setDateAdded(" ");
    setStartDate(" ");
    setEndDate(" ");

    setHours(0);
    setMinutes(0);
    setSeconds(0);

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
    <>
      <VideoForm1
        {...commonFields}
        title={title}
        shortDesc={shortDesc}
        longDesc={longDesc}
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
      />
    </>
  );
};
export default NewVideo;
