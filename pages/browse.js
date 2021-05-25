import Category from "../components/videos/Category";
import { CircularProgress, createStyles } from "@material-ui/core";
import Featured from "../components/videos/Featured";
import Content from "../layout/Content";
import React from "react";
const browse = ({ videos, videoLoading }) => {
  return (
    <Content title="Browse" className="Browse">
      <div style={!videoLoading ? style.hidden : style.progress}>
        <CircularProgress size={50} />
      </div>
      {videos.map((entry) => {
        if (entry.media.length === 0) return null;
        else if (entry.name === "FEATURED") {
          return <Featured videos={entry.media} key={entry._id} />;
        } else {
          return (
            <Category title={entry.name} videos={entry.media} key={entry._id} />
          );
        }
      })}
    </Content>
  );
};
const style = createStyles({
  hidden: {
    display: "none",
  },
  progress: {
    width: "100%",
    textAlign: "center",
    marginTop: "40px",
  },
});
export default browse;
