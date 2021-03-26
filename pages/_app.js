import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { server } from "../util/axios";
import * as gtag from "../lib/gtag";
import {
  CssBaseline,
  StylesProvider,
  MuiThemeProvider,
} from "@material-ui/core";
import theme from "../public/styles/theme";
import "../public/styles/index.css";
import Page from "../layout/Page";
const App = ({ Component, pageProps }) => {
  const [videos, setVideos] = useState([]);
  const [list, setList] = useState([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const router = useRouter();

  //* Google Analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  //* Set Token
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const t = localStorage.getItem("token");
        if (token) {
          localStorage.setItem("token", token);
          const u = await server.post("/auth/verify", { token });
          console.log(u)
          setUser(u.data);
        } else if (!token && t && t !== token) setToken(t);
      } catch (er) {
        setUser({});
        localStorage.removeItem("token");
        console.log(er.message);
      }
    };
    verifyToken();
  }, [token]);

  //* Get Videos and Organize them in a list
  useEffect(() => {
    const getVids = async () => {
      const tempList = [
        { title: "Featured", videos: [] },
        { title: "Welcome to USWC", videos: [] },
        { title: "Movies", videos: [] },
        { title: "TV Shows", videos: [] },
        { title: "News and Events", videos: [] },
        { title: "Music", videos: [] },
        { title: "Short Rips", videos: [] },
        { title: "The Chill Channel", videos: [] },
        { title: "Pilots", videos: [] },
        { title: "This is USWC!", videos: [] },
      ];
      try {
        setVideoLoading(true);
        const res = await server("/vimeo");
        res.data.forEach((video) => {
          for (let x = 0; x < tempList.length; x++) {
            const isFirst = () => {
              if (video.tags.length !== 0) {
                for (const tag of video.tags) {
                  const t = tag.name.split(":");
                  if (t[0] === "ep" && parseInt(t[1]) === 1) {
                    return true;
                  } else if (t[0] === "ep" && parseInt(t[1]) !== 1)
                    return false;
                }
                return true;
              }
              return false;
            };

            const exists = (title) => tempList.some((t) => t.title === title);

            if (
              !exists(video.parent_folder.name) &&
              video.parent_folder.name !== "BIFs"
            ) {
              tempList.push({ title: video.parent_folder.name, videos: [] });
            }

            if (video.tags.length === 0 || isFirst()) {
              if (tempList[x].title === video.parent_folder.name) {
                tempList[x].videos.push({
                  uri: video.uri,
                  pictures: video.pictures,
                  desc: video.description,
                  name: video.name,
                  key: video.resource_key,
                });
                break;
              }
            }
          }
        });

        setList(tempList);
        setVideos(res.data);
        setVideoLoading(false);
      } catch (er) {
        console.log(er.message);
      }
    };
    getVids();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline>
          <Page token={token} user={[user, setUser]}>
            <Component
              {...pageProps}
              list={list}
              videos={videos}
              videoLoading={videoLoading}
              token={[token, setToken]}
              user={[user, setUser]}
            />
          </Page>
        </CssBaseline>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default App;
