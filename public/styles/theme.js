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
  overrides: {},
});
export default theme;
