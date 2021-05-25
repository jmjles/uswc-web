import { Typography as Font } from "@material-ui/core";
import { useRouter } from "next/router";
const Video = ({ vid, ep: [ep, setEp], series }) => {
  const router = useRouter();
  const handleClick = (place) => {
    if (place === "Previously") {
      router.push(`/watch/${series[ep - 1]._id}`);
      setEp(ep - 1);
    } else {
      router.push(`/watch/${series[ep + 1]._id}`);
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
            src={vid.thumbnail}
            onClick={
              vid.placement !== "Now Playing"
                ? () => handleClick(vid.placement)
                : undefined
            }
          />
          <Font>{vid.title}</Font>
        </>
      )}
    </div>
  );
};

export default Video;
