import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Item, { SimpleItem } from "../../../layout/dashboard/Item";
import { server, verify } from "../../../util/axios";
import Info from "../info/Info";
import Settings from "../settings/Settings";
const ViewerDashboardF = (props) => {
  const [fetchError, setFetchError] = useState(false);
  const [l, setL] = useState(false);
  const settings = new SimpleItem(
    "Settings",
    "settings",
    <Settings {...props} />
  );
  const Information = new SimpleItem("Info", "info", <Info {...props} />);
  const menu = [Information, settings];
  return { menu, loading: l, fetchError };
};

export default ViewerDashboardF;
