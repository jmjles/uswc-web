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
        src={video.pictures.sizes[5].link}
        onClick={handleClick}
      />
      <Font>{video.name}</Font>
    </div>
  );
};

export default Video;
