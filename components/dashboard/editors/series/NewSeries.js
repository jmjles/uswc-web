import { useRef, useState } from "react";
import { server } from "../../../../util/axios";
import SeriesForm1 from "./SeriesForm1";
import SeriesForm2 from "./SeriesForm2";

const NewSeries = ({refresh}) => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");

  const [releaseDate, setReleaseDate] = useState(" ");
  const [dateAdded, setDateAdded] = useState(" ");
  const [startDate, setStartDate] = useState(" ");
  const [endDate, setEndDate] = useState(" ");

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
  const Reset = () =>{
    setTitle("");
    setShortDesc("");
    setLongDesc("");
    setSubscription(false);
    setThumbnail("");
    setTags([]);
    setTag("");
    setGenres([]);
    setGenre("");

    setReleaseDate(" ");
    setDateAdded(" ");
    setStartDate(" ");
    setEndDate(" ");

    setCreated(false);
    setShow(false);
    setLoading(false);
    setStep(1);
  }
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (step === 2) {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("shortDesc", shortDesc);
        formData.append("longDesc", longDesc);
        formData.append("subscription", subscription);
        formData.append("thumbnail", thumbnail);
        formData.append("releaseDate", releaseDate);
        formData.append("dateAdded", dateAdded);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);

        tags.forEach((t) => formData.append("tags", t));
        genres.forEach((g) => formData.append("genres", g));

        await server.post("/video/series", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setLoading(false);
        setShow(true);
        setCreated(true);
        await refresh();
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

  const commonFields = { step: [step, setStep], handleChange, handleSubmit };
  return (
    <div>
      <SeriesForm1
        {...commonFields}
        title={title}
        shortDesc={shortDesc}
        longDesc={longDesc}
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
    </div>
  );
};

export default NewSeries;
