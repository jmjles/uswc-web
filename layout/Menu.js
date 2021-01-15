import { Button, Grid, MenuItem, Typography as Font } from "@material-ui/core";
import Link from "next/link";
const Menu = () => {
  return (
    <Grid container justify="space-around" sm={0} alignItems="center" className="Menu">
      <Grid item>
        <Link href="/">
          <img src="/img/weed-logo.png" height="100px" />
        </Link>
      </Grid>
      <Grid item>
        <Link href="/get-started">
          <Button color="primary" size="large">
            <Font variant="button">Get Started</Font>
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link href="/browse">
          <Button color="primary" size="large">
            <Font variant="button">Browse</Font>
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link href="/swag">
          <Button color="primary" size="large">
            <Font variant="button">Swag</Font>
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Menu;
