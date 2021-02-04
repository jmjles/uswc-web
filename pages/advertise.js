import { Button, Typography } from "@material-ui/core";
import Page from "../layout/Page";

const Advertise = () => {
  return (
    <Page title="Advertise" className="Advertise">
      <div className="PlayerContainer" className="PlayerContainer">
        <iframe
          src="https://player.vimeo.com/video/288596409"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        />
      </div>

      <a href="/assets/USWC-Media-Kit.pdf" target="_blank">
        <Button color="primary" variant="contained" size="large">
          <Typography>Learn More</Typography>
        </Button>
      </a>
      <div className="PlayerContainer" className="PlayerContainer">
        <iframe
          src="https://player.vimeo.com/video/288593400"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        />
      </div>
    </Page>
  );
};

export default Advertise;
