import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { verify } from "../../util/axios";

const DashboardF = (props) => {
  const [tab, setTab] = useState(props.menu[0].value);
  const [subTab, setSubTab] = useState(`${tab} edit`);
  const [showDash, setShowDash] = useState(false);
  const router = useRouter();
  const handleTab = (e, value) => {
    setTab(value);
    setSubTab(`${value} edit`);
  };
  const handleSubTab = (e, value) => setSubTab(value);

  useEffect(() => {
    (async () => {
      if (!showDash) {
        const u = await verify();
        if (!u.data) return router.push("/get-started");
        if (props.dashboardType) {
          if (u.data.type !== props.dashboardType)
            return router.push(`${u.data.type}-dashboard`);
        } else {
          return setShowDash(true);
        }
        return setShowDash(true);
      }
    })();
  }, [props.user[0]]);
  return { tab, subTab, handleTab, handleSubTab, showDash };
};

export default DashboardF;
