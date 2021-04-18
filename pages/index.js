import { Button, Grid, Typography as Font } from "@material-ui/core";
import Link from "next/link";
import { useEffect } from "react";
import Page from "../layout/Page";
import { Waypoint } from "react-waypoint";
import { fadeIn } from "../util/animations";
import Content from "../layout/Content";
export default function Home() {
  const weedIcon = "/img/weed-icon.png";
  return (
    <Content title="Home" className="Home">
      <div className="PlayerContainer">
        <iframe
          src="https://player.vimeo.com/video/392824756"
          frameBorder="0"
          allow="fullscreen"
          allowFullScreen
        />
      </div>

      <section>
        <Font variant="h1">We're doing for weed, what MTV did for music</Font>
        <Link href="/browse">
          <Button variant="contained" color="primary" size="large">
            <Font variant="button">Explore Our Channel</Font>
          </Button>
        </Link>
      </section>

      <Grid container justify="space-around" component="section" id="services">
        <Link href="/get-started">
          <Grid
            item
            xs={12}
            sm={3}
            container
            direction="column"
            alignContent="center"
          >
            <img src={weedIcon} />
            <Font align="center" variant="h5">
              Subscribe
            </Font>
          </Grid>
        </Link>

        <Link href="/advertise">
          <Grid
            item
            xs={12}
            sm={3}
            container
            direction="column"
            alignContent="center"
          >
            <img src={weedIcon} />
            <Font align="center" variant="h5">
              Advertise
            </Font>
          </Grid>
        </Link>
        <Grid
          item
          xs={12}
          sm={3}
          container
          direction="column"
          alignContent="center"
        >
          <img src={weedIcon} />
          <Font align="center" variant="h5">
            Broadcast
          </Font>
        </Grid>
      </Grid>
      <Waypoint onEnter={() => fadeIn("#services", true)} />
      <section>
        <Font variant="h3">Get USWC On Your Favorite Device!</Font>
        <a href="https://channelstore.roku.com/details/b159518835b63c14c8ddb1d97e48a630/us-weed-channel">
          <img />
        </a>
      </section>
    </Content>
  );
}
