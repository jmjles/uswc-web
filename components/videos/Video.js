import { Grid, Typography as Font } from "@material-ui/core";
import { useRouter } from "next/router";

const Video = ({ video }) => {
  const history = useRouter();
  const handleClick = () => {
    history.push(`/watch/${video._id}`);
  };
  return (
    <div className="VideoImgContainer">
      <img
        className="VideoImg"
        src={video ? video.thumbnail : null}
        onClick={handleClick}
      />
      <Font onClick={handleClick}>{video ? video.title : null}</Font>
      <div className="Overlay" onClick={handleClick} />
    </div>
  );
};

export default Video;
