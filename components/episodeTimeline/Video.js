import { Typography as Font } from "@material-ui/core";
const Video = ({ vid, ep: [ep, setEp], series }) => {
  const handleClick = (place) => {
    if (place === "Previously") {
      localStorage.setItem("vidId", series[ep - 1].resource_key);
      setEp(ep - 1);
    } else {
      localStorage.setItem("vidId", series[ep + 1].resource_key);
      setEp(ep + 1);
    }
  };
  return (
    <div className="VideoImgContainer">
      {vid && (
        <>
          <Font>{vid.placement}</Font>
          <img
            className="VideoImg"
            src={vid.pictures.sizes[5].link}
            onClick={
              vid.placement !== "Now Playing" &&
              (() => handleClick(vid.placement))
            }
          />
          <Font>{vid.name}</Font>
        </>
      )}
    </div>
  );
};

export default Video;
