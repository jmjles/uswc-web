import {
  Button,
  CircularProgress,
  createStyles,
  Grid,
  Modal,
  Typography as Font,
} from "@material-ui/core";
import { Facebook, Twitter } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VideoTimeline from "../../../components/episodeTimeline/VideoTimeline";
import Content from "../../../layout/Content";

const Watch = ({ videoLoading, videos, user: [user] }) => {
  const [selected, setSelected] = useState({});
  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState("");
  const [currentEp, setCurrentEp] = useState(0);
  const [url, setURL] = useState("");

  const router = useRouter();
  useEffect(() => {
    setURL(window.location.href);
  }, [currentEp]);

  useEffect(() => {
    const { id } = router.query;
    if (!videoLoading && id) {
      const categories = videos.filter((v) => v.media.length > 0);
      const seriesAndMovies = categories.map((e) => e.media).flat();
      const episodes = seriesAndMovies
        .filter((e) => e.seasons)
        .map((e) => e.seasons)
        .flat()
        .map((e) => e.episodes)
        .flat();
      const selectedEpisode = episodes.find(
        (e) => e.seriesId === id || e._id === id
      );
      const selectedMedia = seriesAndMovies.find((e) => e._id === id);
      let list = [];
      if (selectedEpisode) {
        const series = seriesAndMovies.find(
          (s) => s._id === selectedEpisode.seriesId
        );
        setTitle(series.title);
        list = series.seasons[0].episodes.sort((a, b) => a.episode - b.episode);
        setSeries(list);
        if (
          id !== list[currentEp]._id &&
          !seriesAndMovies.find((e) => e._id === id)
        ) {
          let i = 0;
          list.map((e, index) => {
            if (e._id === id) {
              i = index;
            }
          });
          setCurrentEp(i);
        }
        setSelected(list[currentEp] || {});
      } else {
        setSelected(selectedMedia || {});
      }
      setSeries(list || []);
    }
  }, [currentEp, videoLoading]);
  return (
    <Content title="Watch" className="Watch">
      <CircularProgress style={!videoLoading ? style.hidden : {}} />
      {!user.sub && (
        <Modal open={true} className="Modal">
          <>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push("/get-started")}
                >
                  Subscribe Now!
                </Button>
              </Grid>
            </Grid>
          </>
        </Modal>
      )}
      {!videoLoading && (
        <div>
          <div className="PlayerContainer">
            {selected.subscription &&
            !user.subscribed &&
            (!user.type || user.type === "viewer") ? (
              <img src={selected.thumbnail} />
            ) : (
              <video
                controls
                width="100%"
                height="500px"
                src={selected ? selected.url : ""}
              >
                Video has failed to load...
              </video>
            )}

            <div>
              <a
                href={`https://www.facebook.com/sharer.php?t=I'm watching ${selected.title} at U.S. Weed Channel!&u=${url}`}
                target="_blank"
              >
                <Facebook color="primary" />
              </a>
              <a
                href={`https://twitter.com/share?url=I'm watching ${selected.title} at U.S. Weed Channel! ${url}`}
                target="_blank"
              >
                <Twitter color="primary" />
              </a>
            </div>
          </div>
          <section>
            <Font variant="h1">{title}</Font>
            <Font variant="h2">{selected.title}</Font>
            <Font variant="body1">{selected.long_desc}</Font>
          </section>
          {selected.type === "episode" && (
            <VideoTimeline series={series} ep={[currentEp, setCurrentEp]} />
          )}
        </div>
      )}
    </Content>
  );
};
const style = createStyles({
  hidden: {
    display: "none",
  },
});
export default Watch;
