import { useEffect, useState } from "react";
import Item from "../../../layout/dashboard/Item";
import { server } from "../../../util/axios";
import Category from "./category/Category";
import NewCategory from "./category/NewCategory";
import Episodes from "./episodes/Episodes";
import NewEpisode from "./episodes/NewEpisode";
import Movies from "./movies/Movies";
import NewMovie from "./movies/NewMovie";
import NewSeries from "./series/NewSeries";
import Series from "./series/Series";
import NewVideo from "./videos/NewVideo";
import Videos from "./videos/Videos";

const EditorDashboardF = () => {
  //* DB Table
  const [s, setS] = useState([]);
  const [m, setM] = useState([]);
  const [c, setC] = useState([]);

  //* Media Types
  const [e, setE] = useState([]);
  const [v, setV] = useState([]);
  const [mov, setMov] = useState([]);

  //* Error Handling Variables
  const [l, setL] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const handleLoading = () => setL((prev) => !prev);
  const handleFetchError = () => setFetchError((prev) => !prev);
  //* Series

  const getSeries = async ({ init }) => {
    try {
      if (!l && !init) handleLoading();
      const s = await server("/video/series");
      setS(s.data);
      if (l && !init) handleLoading();
    } catch (er) {
      if (l && !init) handleLoading();
      if (!fetchError && !init) handleFetchError();
      console.log(er);
    }
  };

  //* Media
  const getVideos = async ({ init }) => {
    try {
      if (!l && !init) handleLoading();
      const m = await server("/video");
      setM(m.data);
      if (l && !init) handleLoading();
    } catch (er) {
      if (l && !init) handleLoading();
      if (!fetchError && !init) handleFetchError();
      console.log(er);
    }
  };

  //* Categories

  const getCategories = async ({ init }) => {
    try {
      if (!l && !init) handleLoading();
      const c = await server("/video/category");
      setC(c.data);
      if (l && !init) handleLoading();
    } catch (er) {
      if (l && !init) handleLoading();
      if (!fetchError && !init) handleFetchError();
      console.log(er);
    }
  };

  //* Media Update

  useEffect(() => {
    setMov(m.filter((v) => v.type === "movie"));
    setE(m.filter((v) => v.type === "episode"));
    setV(m.filter((v) => v.type === "shortFormVideo"));
  }, [m]);

  //* Get Initial Data
  useEffect(() => {
    const getAll = async () => {
      try {
        handleLoading();
        await getSeries({ init: true });
        await getVideos({ init: true });
        await getCategories({ init: true });
        handleLoading();
      } catch (er) {
        console.log(er);
        handleLoading();
        handleFetchError();
      }
    };
    getAll();
  }, []);

  const category = new Item(
    "Categories",
    "category",
    <Category categories={c} refresh={getCategories} />,
    <NewCategory categories={c} refresh={getCategories} />
  );
  const video = new Item(
    "Videos",
    "video",
    <Videos categories={c} videos={v} refresh={getVideos} />,
    <NewVideo categories={c} videos={v} refresh={getVideos} />
  );
  const movie = new Item(
    "Movies",
    "movie",
    <Movies categories={c} movies={mov} refresh={getVideos} />,
    <NewMovie categories={c} movies={mov} refresh={getVideos} />
  );
  const episode = new Item(
    "Episodes",
    "episode",
    <Episodes series={s} episodes={e} refresh={getVideos} />,
    <NewEpisode series={s} episodes={e} refresh={getVideos} />
  );
  const series = new Item(
    "Series",
    "series",
    <Series categories={c} series={s} refresh={getSeries} />,
    <NewSeries categories={c} series={s} refresh={getSeries} />
  );

  const menu = [series, episode, video, movie, category];
  return { menu, handleLoading, loading: l, fetchError, handleFetchError };
};

export default EditorDashboardF;
