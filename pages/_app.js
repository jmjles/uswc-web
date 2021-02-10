import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { vimeo } from "../util/axios";
import * as gtag from "../lib/gtag";
import { CssBaseline, ThemeProvider, StylesProvider } from "@material-ui/core";
import theme from "../public/styles/theme";
import "../public/styles/index.css";
const App = ({ Component, pageProps }) => {
  const [videos, setVideos] = useState([]);
  const [list, setList] = useState([]);
  const [videoLoading, setVideoLoading] = useState(false);
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
        const res = await vimeo("/");
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
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline>
          <Component
            {...pageProps}
            list={list}
            videos={videos}
            videoLoading={videoLoading}
          />
        </CssBaseline>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
