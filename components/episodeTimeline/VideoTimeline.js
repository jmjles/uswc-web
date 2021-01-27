import { useEffect, useState } from "react";
import Video from "./Video";

const VideoTimeline = ({ ep: [ep, setEp], series }) => {
  const [vids, setVids] = useState([]);
  useEffect(() => {
    let prev = series[ep - 1];
    let next = series[ep + 1];
    prev && (prev.placement = "Previously");
    next && (next.placement = "Next");
    series[ep] && (series[ep].placement = "Now Playing");
    setVids([prev, series[ep], next]);
  }, [ep, series]);
  return (
    <section>
      {vids.map((vid) => (
        <Video ep={[ep, setEp]} vid={vid} />
      ))}
    </section>
  );
};

export default VideoTimeline;
