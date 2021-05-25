import { Grid } from "@material-ui/core";
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
    <Grid container className="TimeLine" justify="space-around">
      {vids.map((vid, i) => (
        <Grid item xs={3} key={i}>
          <Video ep={[ep, setEp]} vid={vid} series={series} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoTimeline;
