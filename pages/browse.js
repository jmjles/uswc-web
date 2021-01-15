import Page from "../layout/Page";
import Category from "../components/videos/Category";
import { CircularProgress, createStyles } from "@material-ui/core";
import Featured from "../components/videos/Featured";
const browse = ({ list, videoLoading }) => {
  return (
    <Page>
      <div className="Browse">
        <CircularProgress style={!videoLoading && style.hidden} size={50} />
        {list.map((entry) => {
          if (entry.title === "Featured") {
            return <Featured videos={entry.videos} />;
          } else {
            return <Category title={entry.title} videos={entry.videos} />;
          }
        })}
      </div>
    </Page>
  );
};
const style = createStyles({
  hidden: {
    display: "none",
  },
});
export default browse;
