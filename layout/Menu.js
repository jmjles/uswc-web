import {
  Button,
  createStyles,
  Grid,
  MenuItem,
  Typography as Font,
} from "@material-ui/core";
import { MenuOpenRounded, MenuRounded } from "@material-ui/icons";
import Link from "next/link";
import { useState } from "react";
import { sidebarAni } from "../util/animations";

const Menu = ({ token , user:[user,s] }) => {
  const [open, setOpen] = useState(false);
  const handleMenu = () => setOpen(!open);
  const handleSidebar = () => sidebarAni(handleMenu);
  return (
    <Grid container justify="space-around" alignItems="center" className="Menu">
      <Grid item>
        <Link href="/">
          <img src="/img/uswc-logo.png" />
        </Link>
      </Grid>
      <Grid item className="TabletMenu">
        <Link href="/get-started">
          <Button color="primary" size="large" style={token && style.hidden}>
            <Font variant="button">Get Started</Font>
          </Button>
        </Link>
        <Link href={`/${user.type}-dashboard`}>
          <Button
            color="primary"
            size="large"
            style={!token ? style.hidden : null}
          >
            <Font variant="button">Dashboard</Font>
          </Button>
        </Link>
      </Grid>
      <Grid item className="TabletMenu">
        <Link href="/browse">
          <Button color="primary" size="large">
            <Font variant="button">Browse</Font>
          </Button>
        </Link>
      </Grid>
      <Grid item className="TabletMenu">
        <Link href="/swag">
          <Button color="primary" size="large">
            <Font variant="button">Swag</Font>
          </Button>
        </Link>
      </Grid>
      <Grid item className="MobileOnly">
        <MenuRounded
          color="primary"
          style={open ? style.hidden : null}
          onClick={handleSidebar}
        />
        <MenuOpenRounded
          color="primary"
          style={!open ? style.hidden : null}
          onClick={handleSidebar}
        />
      </Grid>
    </Grid>
  );
};

const style = createStyles({
  hidden: {
    display: "none",
  },
});

export default Menu;
