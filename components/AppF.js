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
    localStorage.removeItem("TOKEN");
    setUser({});
    router.push("/");
  };
  //* Get Videos and Organize them in a list
  useEffect(() => {
    const getVids = async () => {
      try {
        setVideoLoading(true);
        const res = await server()("/video");
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
