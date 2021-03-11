import { useRouter } from "next/router";
import { useEffect } from "react";
import NewVideo from "../components/publisher/newVideo/NewVideo";
import Content from "../layout/Content";

const dashboard = () => {
  const history = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) history.push("/get-started");
  }, []);
  return (
    <Content title="Dashboard" className="Dashboard">
      <NewVideo />
    </Content>
  );
};

export default dashboard;
