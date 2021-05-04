import React from "react";
import AdminDashboardF from "../components/dashboard/admin/AdminDashboardF";
import Dashboard from "../layout/dashboard/Dashboard";

function AdminDashboard(props) {
  const { loading, fetchError, menu } = AdminDashboardF(props);
  return (
    <Dashboard
      className="Dashboard Parent"
      title="Dashboard"
      {...props}
      {...{ loading, error: fetchError, menu }}
      topMenu
      dashboardType="admin"
    />
  );
}

export default AdminDashboard;
