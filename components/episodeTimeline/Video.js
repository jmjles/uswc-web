import { Typography as Font } from "@material-ui/core";
const Video = ({ vid = {} }) => {
  const handleClick = () => {
    localStorage.setItem("vidId", vid.key);
  };
  return (
    <div className="VideoImgContainer">
      {vid & (
        <img
          className="VideoImg"
          src={vid.pictures.sizes[5].link}
          onClick={handleClick}
        />
      )}

      <Font>{vid.name}</Font>
    </div>
  );
};

export default Video;
