import React from "react";
import ViewerDashboardF from "../components/dashboard/viewers/ViewerDashboardF";
import Dashboard from "../layout/dashboard/Dashboard";
import { server, verify } from "../util/axios";
function ViewerDashboard(props) {
  const { loading, error: fetchError, menu } = ViewerDashboardF(props);
  return (
    <Dashboard
      className="Editor"
      title="Dashboard"
      {...props}
      {...{ loading, error: fetchError, menu }}
      sideMenu
      dashboardType="viewer"
    />
  );
}
export default ViewerDashboard;
