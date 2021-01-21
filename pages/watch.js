import { CircularProgress, createStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Page from "../layout/Page";

const Watch = ({ videoLoading, videos }) => {
  const history = useRouter();
  const [uri, setUri] = useState("");
  const [videoKey, setVideoKey] = useState(undefined);
  useEffect(() => {
    const id = localStorage.getItem("vidId");
    if (id !== videoKey) {
      setVideoKey(id);
    }
  }, []);
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
      console.log(selectedVid);
      setUri(`https://player.vimeo.com/video/${selectedVid.uri.split("/")[2]}`);
    }
  }, [videoKey]);
  return (
    <Page>
      <CircularProgress style={!videoLoading && style.hidden} />
      <section>
        <iframe
          src={uri}
          width="100%"
          height="600px"
          allowFullScreen
          frameBorder="0"
          allow="fullscreen"
        />
      </section>
    </Page>
  );
};
const style = createStyles({
  hidden: {
    display: "none",
  },
});
export default Watch;
