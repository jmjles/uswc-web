import { Grid, Typography as Font } from "@material-ui/core";
import { useRouter } from "next/router";

const Video = ({ video }) => {
  const history = useRouter();
  const handleClick = () => {
    localStorage.setItem("vidId", video.key);
    history.push("/watch");
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
