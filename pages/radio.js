import { Typography as Font } from "@material-ui/core";
import "video.js/dist/video-js.css";
import Content from "../layout/Content";

const Radio = () => {
  return (
    <Content title="Radio">
      <section className="Radio">
        <a
          href="https://epsilon.shoutca.st:2199/tunein/usweedchannel.pls"
          className="cc_streaminfo"
          data-type="song"
          data-username="usweedchannel"
        >
          <Font variant="h1">Loading ...</Font>
        </a>
        <img
          className="cc_streaminfo"
          data-type="trackimageurl"
          data-username="usweedchannel"
        />
        <br />
        <audio controls={true}>
          <source src="https://usweedchannel.radioca.st/stream" />
        </audio>

      </section>
      <script
        language="javascript"
        type="text/javascript"
        src="https://epsilon.shoutca.st:2199/system/player.js"
      />
      <script
        language="javascript"
        type="text/javascript"
        src="https://epsilon.shoutca.st:2199/system/streaminfo.js"
      />
    </Content>
  );
};

export default Radio;
