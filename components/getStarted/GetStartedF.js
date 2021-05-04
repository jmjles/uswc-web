import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const GetStartedF = (props) => {
  const [type, setType] = useState("none");
  const handleType = (type) => setType(type);
  const history = useRouter();
  const handleUser = useEffect(() => {
    if (props.user[0].type) history.push(`/${props.user[0].type}-dashboard`);
  }, [props.user[0]]);
  return { type, setType, handleType, handleUser };
};

export default GetStartedF;
