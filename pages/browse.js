import Category from "../components/videos/Category";
import { CircularProgress, createStyles } from "@material-ui/core";
import Featured from "../components/videos/Featured";
import Content from "../layout/Content";
import React from "react";
const browse = ({ list, videoLoading }) => {
  return (
    <Content title="Browse" className="Browse">
      <div style={!videoLoading ? style.hidden : style.progress}>
        <CircularProgress size={50} />
      </div>
      {list.map((entry) => {
        if (entry.title === "Featured") {
          return <Featured videos={entry.videos} />;
        } else {
          return <Category title={entry.title} videos={entry.videos} />;
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
