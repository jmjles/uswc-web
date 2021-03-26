import {
  CircularProgress,
  createStyles,
  Typography as Font,
} from "@material-ui/core";
import { Facebook, Twitter } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VideoTimeline from "../../../components/episodeTimeline/VideoTimeline";
import Content from "../../../layout/Content";

const Watch = ({ videoLoading, videos }) => {
  const [uri, setUri] = useState("");
  const [selected, setSelected] = useState({});
  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState("");
  const [currentEp, setCurrentEp] = useState(0);
  const [url,setURL] = useState("")

  const router = useRouter();
  const { id } = router.query;
  
  useEffect(()=>{
setURL(window.location.href)
  },[currentEp])
  useEffect(() => {
    if (!videoLoading && id) {
      const selectedVid = videos.find((video) => video.resource_key === id);
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
  }, [currentEp, videoLoading]);

  return (
    <Content title="Watch" className="Watch">
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
      <div>
         <a
          href={`https://www.facebook.com/sharer.php?t=I'm watching ${
            title || selected.name
          } at U.S. Weed Channel!&u=${url}`}
          target="_blank"
        >
          <Facebook color="primary" />
        </a>
        <a
          href={`https://twitter.com/share?url=I'm watching ${
            title || selected.name
          } at U.S. Weed Channel! ${url}`}
          target="_blank"
        >
          <Twitter color="primary" />
        </a>
      </div>
      <section>
        <Font variant="h2">{title}</Font>
        <Font variant="body1">{selected.description}</Font>
      </section>
      <VideoTimeline series={series} ep={[currentEp, setCurrentEp]} />
    </Content>
  );
};
const style = createStyles({
  hidden: {
    display: "none",
  },
});
export default Watch;
