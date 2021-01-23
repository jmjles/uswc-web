import { createStyles, Grid, Typography as Font } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useEffect, useState } from "react";
import Video from "./Video";
const Category = ({ title, videos }) => {
  const [width, setWidth] = useState(1);
  const [vids, setVids] = useState([]);
  const [lastVid, setLastVid] = useState(0);
  const [prevVis, setPrevVis] = useState(true);
  const [nextVis, setNextVis] = useState(true);
  useEffect(() => {
    const getWidth = () => setWidth(window.innerWidth);
    getWidth();
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  });

  useEffect(() => {
    let list = [];
    const makeList = (num) => {
      for (let i = 1; i <= num; i++) {
        if (!videos[lastVid + i]) break;
        list.push(videos[lastVid + i]);
      }
    };

    const manageNav = (num) => {
      if (!videos[lastVid - num] && prevVis) {
        setPrevVis(false);
      } else if (videos[lastVid - num] && !prevVis) {
        setPrevVis(true);
      }
      if (!videos[lastVid + num] && nextVis) {
        setNextVis(false);
      } else if (videos[lastVid + num] && !nextVis) {
        setNextVis(true);
      }
    };

    if (width < 700) {
      makeList(2);
      manageNav(2);
    } else {
      makeList(4);
      manageNav(4);
    }
    setVids(list);
  }, [width, lastVid]);

  const handleNav = (id) => {
    if (id === "next") {
      if (width < 700) {
        setLastVid(lastVid + 2);
      } else {
        setLastVid(lastVid + 4);
      }
    } else {
      if (width < 700) {
        setLastVid(lastVid - 2);
      } else {
        setLastVid(lastVid - 4);
      }
    }
  };

  return (
    <section>
      <Font variant="h4">{title}</Font>
      <div className="Grid">
        <div className="wrap">
          <div
            id="prev"
            onClick={() => handleNav("prev")}
            style={prevVis ? {} : styles.hidden}
          >
            <NavigateBefore color="primary" onClick={() => handleNav("prev")} />
          </div>
          {vids.map((vid) => (
            <Video video={vid} />
          ))}
          <div
            id="next"
            onClick={() => handleNav("next")}
            style={nextVis ? {} : styles.hidden}
          >
            <NavigateNext color="primary" onClick={() => handleNav("next")} />
          </div>
        </div>
      </div>
    </section>
  );
};
const styles = createStyles({
  hidden: {
    display: "none",
  },
});
export default Category;
