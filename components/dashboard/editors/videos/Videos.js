import { Grid  } from "@material-ui/core";
import VideoItem from "./VideoItem";

const Videos = ({ videos = [], refresh }) => {
  return (
    <Grid container direction="column" spacing={2}>
      {videos.map((v) => (
        <VideoItem video={v} key={v._id} refresh={refresh} />
      ))}
    </Grid>
  );
};

export default Videos;
