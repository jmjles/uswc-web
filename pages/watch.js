import {
  CircularProgress,
  createStyles,
  Typography as Font,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VideoTimeline from "../components/episodeTimeline/VideoTimeline";
import Page from "../layout/Page";

const Watch = ({ videoLoading, videos }) => {
  const history = useRouter();
  const [uri, setUri] = useState("");
  const [videoKey, setVideoKey] = useState(undefined);
  const [selected, setSelected] = useState({});
  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState("");
  const [currentEp, setCurrentEp] = useState(0);
  useEffect(() => {
    const id = localStorage.getItem("vidId");
    if (id !== videoKey) {
      setVideoKey(id);
    }
  }, [videoKey]);

  useEffect(() => {
    const id = localStorage.getItem("vidId");
    if (!id) {
      history.push("/browse");
    }
  });

  useEffect(() => {
    if (!videoLoading && videoKey) {
      const selectedVid = videos.find(
        (video) => video.resource_key === videoKey
      );
      let list = [];
      let ser = "";
      selectedVid.tags.forEach((tag) => {
        const params = tag.name.split(":");
        if (params[0] === "ser") ser = params[1];
        if (params[0] === "ep") {
          list[params[1]] = selectedVid;
          setCurrentEp(parseInt(params[1]));
        }
      });
      setTitle(ser);
      const category = selectedVid.parent_folder.name;
      videos
        .filter((video) => video.parent_folder.name === category)
        .forEach((video) => {
          if (video.tags.find((tag) => tag.name.includes(ser))) {
            video.tags.forEach((tag) => {
              const params = tag.name.split(":");
              if (params[0] === "ep") list[params[1]] = video;
            });
          }
        });
      setSelected(selectedVid);
      setSeries(list);
      setUri(`https://player.vimeo.com/video/${selectedVid.uri.split("/")[2]}`);
    }
  }, [videoKey, videoLoading]);

  return (
    <Page>
      <div className="Watch">
        <CircularProgress style={!videoLoading ? style.hidden : {}} />
        <div className="PlayerContainer">
          <iframe
            src={uri}
            width="100%"
            height="600px"
            allowFullScreen
            frameBorder="0"
            allow="fullscreen"
          />
        </div>
        <section>
          <Font variant="h2">{title}</Font>
          <Font variant="body1">{selected.description}</Font>
        </section>
        <VideoTimeline series={series} ep={[currentEp, setCurrentEp]} />
      </div>
    </Page>
  );
};
const style = createStyles({
  hidden: {
    display: "none",
  },
});
export default Watch;
