import { Grid, Typography as Font } from "@material-ui/core";

const Video = ({ video }) => {
  return (
    <div className="VideoImgContainer">
      <img className="VideoImg" src={video.pictures.sizes[5].link} />
      <Font>{video.name}</Font>
    </div>
  );
};

export default Video;
