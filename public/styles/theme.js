import { createMuiTheme } from "@material-ui/core";
const bud = "#70AE6E";
const greenBackground = "#EEFFED";
const darkBackground = "#292F36";
const theme = createMuiTheme({
  palette: {
    primary: { main: bud },
    background: {
      default: greenBackground,
    },
  },
  overrides: {
    MuiButton: { containedPrimary: { color: "#FFF" } },
    MuiTypography: {
      h1: {
        fontSize: "2rem",
        textAlign: "center",
        fontWeight: 400,
      },
      h2: {
        fontSize: "1.7rem",
        fontWeight: 300,
      },
      h3: {
        fontSize: "1.6rem",
        fontWeight: 200,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 200,
      },
      h5: {
        fontSize: "1.4rem",
        fontWeight: 200,
      },
    },
  },
});
export default theme;
