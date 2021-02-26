import {useRouter} from "next/router";
import { useEffect } from "react";

const dashboard = () => {
  const history = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) history.push("/get-started");
  }, []);
  return <div>Enter</div>;
};

export default dashboard;
