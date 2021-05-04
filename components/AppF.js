import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as gtag from "../lib/gtag";
import { server, verify } from "../util/axios";
const AppF = () => {
  const [videos, setVideos] = useState([]);
  const [list, setList] = useState([]);
  const [videoLoading, setVideoLoading] = useState(false);
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
        const u = await verify();
        if (u.data) setUser(u.data);
      } catch (er) {
        console.log(er.message);
      }
    };
    verifyToken();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("TOKEN")
    setUser({});
    router.push("/")
  };
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
              tempList.push({
                title: video.parent_folder.name,
                videos: [],
              });
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

  return { videos, videoLoading, list, user, setUser, handleLogout };
};

export default AppF;
