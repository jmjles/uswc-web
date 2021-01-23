import { useEffect, useState } from "react";
import Video from "./Video";

const VideoTimeline = ({ ep: [ep, setEp], series }) => {
  const [vids, setVids] = useState([]);
  useEffect(() => {
    let prev = series[ep - 1];
    let next = series[ep + 1];
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
