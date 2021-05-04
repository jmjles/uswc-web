import {
  CssBaseline,
  StylesProvider,
  MuiThemeProvider,
} from "@material-ui/core";
import theme from "../public/styles/theme";
import "../public/styles/index.css";
import Page from "../layout/Page";
import AppF from "../components/AppF";
import React from "react";
const App = ({ Component, pageProps }) => {
  const { videos, videoLoading, user, setUser, list, handleLogout } = AppF();
  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline>
          <Page user={[user, setUser]}>
            <Component
              {...pageProps}
              list={list}
              videos={videos}
              videoLoading={videoLoading}
              user={[user, setUser]}
              handleLogout={handleLogout}
            />
          </Page>
        </CssBaseline>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default App;
