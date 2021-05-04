import { useEffect, useState } from "react";
import Dashboard from "../../../layout/dashboard/Dashboard";
import { AdminItem } from "../../../layout/dashboard/Item";
import EditorDashboardF from "../editors/EditorDashboardF";
import Settings from "../settings/Settings";
const AdminDashboardF = (props) => {
  const { menu, fetchError, loading } = EditorDashboardF();
  const editor = new AdminItem(
    "Editor",
    "editor",
    (
      <Dashboard
        className="Dashboard Child"
        title="Dashboard"
        {...props}
        {...{ loading, error: fetchError, menu }}
        sideMenu
        bottomMenu
        child
      />
    )
  );
  const settings = new AdminItem(
    "Settings",
    "settings",
    <Settings {...props} />
  );
  const adminMenu = [editor, settings];
  return { menu: adminMenu, l: loading, fetchError };
};

export default AdminDashboardF;
