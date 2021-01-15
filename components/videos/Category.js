import { Grid, Typography as Font } from "@material-ui/core";
import Video from "./Video";
const Category = ({ title, videos }) => {
  return (
    <section>
      <Font variant="h4">{title}</Font>
      <div className="Grid">
        {videos.map((video) => (
          <Video video={video} />
        ))}
      </div>
    </section>
  );
};

export default Category;
