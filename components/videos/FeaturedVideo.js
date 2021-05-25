import { Typography as Font } from "@material-ui/core";

const FeaturedVideo = ({ video }) => {
  return (
    <div className="FeaturedVideoImgContainer">
      <img className="FeaturedVideoImg" src={video.thumbnail} />
      <Font>{video.name}</Font>
      <div className="Overlay" />
    </div>
  );
};

export default FeaturedVideo;
