import { useRouter } from "next/router";
import { useEffect } from "react";
import NewVideo from "../components/publisher/newVideo/NewVideo";
import Page from "../layout/Page";

const dashboard = () => {
  const history = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) history.push("/get-started");
  }, []);
  return (
    <Page title="Dashboard" className="Dashboard">
      <NewVideo />
    </Page>
  );
};

export default dashboard;
