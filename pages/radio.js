import { Typography as Font } from "@material-ui/core";
import Page from "../layout/Page";
import Wip from "../components/Wip";
import Head from "next/head";
const Radio = () => {
  return (
    <Page>
      <Head>
        
      </Head>
      <section className="Radio">
        <a
          href="https://epsilon.shoutca.st:2199/tunein/usweedchannel.pls"
          class="cc_streaminfo"
          data-type="song"
          data-username="usweedchannel"
        >
          <Font variant="h1">Loading ...</Font>
        </a>
        <img
          class="cc_streaminfo"
          data-type="trackimageurl"
          data-username="usweedchannel"
        />
        <br />
        <div class="cc_player" data-username="usweedchannel">
          Loading ...
        </div>
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
    </Page>
  );
};

export default Radio;
