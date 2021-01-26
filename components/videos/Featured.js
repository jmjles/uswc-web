import { createStyles, Typography as Font } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useEffect, useState } from "react";
import FeaturedVideo from "./FeaturedVideo";

const Featured = ({ videos }) => {
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
      for (let i = 0; i < num; i++) {
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
    makeList(1);
    manageNav(1);
    setVids(list);
  }, [width, lastVid]);

  const handleNav = (id) => {
    if (id === "next") {
      setLastVid(lastVid + 1);
    } else {
      setLastVid(lastVid - 1);
    }
  };
  return (
    <div className="FeaturedGrid">
      <div className="wrap">
        <div
          id="prev"
          onClick={() => handleNav("before")}
          style={!prevVis ? styles.hidden : null}
        >
          <NavigateBefore onClick={() => handleNav("before")} color="primary" />
        </div>
        {vids.map((video) => (
          <FeaturedVideo video={video} />
        ))}
        <div
          id="next"
          onClick={() => handleNav("next")}
          style={!nextVis ? styles.hidden : null}
        >
          <NavigateNext onClick={() => handleNav("before")} color="primary" />
        </div>
      </div>
    </div>
  );
};
const styles = createStyles({
  hidden: {
    display: "none",
  },
});
export default Featured;
