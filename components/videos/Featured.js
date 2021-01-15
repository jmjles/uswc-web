import { Typography as Font } from "@material-ui/core";
import FeaturedVideo from "./FeaturedVideo";

const Featured = ({ videos }) => {
  return (
    <div className="FeaturedGrid">
      {videos.map((video) => (
        <FeaturedVideo video={video} />
      ))}
    </div>
  );
};

export default Featured;
