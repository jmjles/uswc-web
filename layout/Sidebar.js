import { Button, Grid, Typography as Font } from "@material-ui/core";
import Link from "next/link";
const Sidebar = () => {
  const removeStyle = () => {
    console.log("in")
    document.querySelector("body").removeAttribute("style");
  };
  return (
    <aside className="Sidebar">
      <Grid container direction="column" alignItems="center">
        <Grid item >
          <Link href="/get-started">
            <Button color="primary" variant="outlined" onClick={removeStyle}>
              <Font variant="button">Get Started</Font>
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/browse">
            <Button color="primary" variant="outlined" onClick={removeStyle}>
              <Font variant="button">Browse</Font>
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/swag">
            <Button color="primary" variant="outlined" onClick={removeStyle}>
              <Font variant="button">Swag</Font>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </aside>
  );
};

export default Sidebar;
