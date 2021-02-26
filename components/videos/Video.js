import { Grid, Typography as Font } from "@material-ui/core";
import { useRouter } from "next/router";

const Video = ({ video }) => {
  const history = useRouter();
  const handleClick = () => {
    history.push(`/watch/${video.key}`);
  };
  return (
    <div className="VideoImgContainer">
      <img
        className="VideoImg"
        src={video ? video.pictures.sizes[5].link : null}
        onClick={handleClick}
      />
      <Font onClick={handleClick}>{video ? video.name : null}</Font>
      <div className="Overlay" onClick={handleClick} />
    </div>
  );
};

export default Video;
