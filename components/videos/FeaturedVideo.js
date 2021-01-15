import { Typography as Font } from "@material-ui/core";

const FeaturedVideo = ({ video }) => {
  return (
    <div className="FeaturedVideoImgContainer">
      <img className="FeaturedVideoImg" src={video.pictures.sizes[5].link} />
      <Font>{video.name}</Font>
    </div>
  );
};

export default FeaturedVideo;
