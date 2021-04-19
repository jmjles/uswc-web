import React, { useEffect, useState } from "react";
import Category from "../components/dashboard/editors/category/Category";
import NewCategory from "../components/dashboard/editors/category/NewCategory";
import Episodes from "../components/dashboard/editors/episodes/Episodes";
import NewEpisode from "../components/dashboard/editors/episodes/NewEpisode";
import Movies from "../components/dashboard/editors/movies/Movies";
import NewMovie from "../components/dashboard/editors/movies/NewMovie";
import NewSeries from "../components/dashboard/editors/series/NewSeries";
import Series from "../components/dashboard/editors/series/Series";
import NewVideo from "../components/dashboard/editors/videos/NewVideo";
import Videos from "../components/dashboard/editors/videos/Videos";
import Dashboard from "../layout/dashboard/Dashboard";
import Item from "../layout/dashboard/Item";
import { server } from "../util/axios";

function EditorDashboard(props) {
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

  const handleLoading = () => setL(!l);
  const handleFetchError = () => setFetchError(!fetchError);
  //* Series

  const getSeries = async () => {
    try {
      if (!l) handleLoading();
      const s = await server("/video/series");
      setS(s.data);
      if (l) handleLoading();
    } catch (er) {
      if (!fetchError) {
        handleFetchError();
      }
      console.log(er);
    }
  };

  //* Media
  const getVideos = async () => {
    try {
      if (!l) handleLoading();
      const m = await server("/video");
      setM(m.data);
      if (l) handleLoading();
    } catch (er) {
      if (l) handleLoading();
      if (!fetchError) handleFetchError();
      console.log(er);
    }
  };

  //* Categories

  const getCategories = async () => {
    try {
      if (!l) handleLoading();
      const c = await server("/video/category");
      setC(c.data);
      if (l) handleLoading();
    } catch (er) {
      if (!fetchError) {
        handleFetchError();
      }
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
    getSeries();
    getVideos();
    getCategories();
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

  return (
    <Dashboard
      className="Editor"
      title="Dashboard"
      {...props}
      loading={l}
      error={fetchError}
      menu={menu}
    ></Dashboard>
  );
}

export default EditorDashboard;
