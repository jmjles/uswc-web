import EditorDashboardF from "../components/dashboard/editors/EditorDashboardF";
import Dashboard from "../layout/dashboard/Dashboard";
function EditorDashboard(props) {
  const { menu, loading, fetchError } = EditorDashboardF();
  return (
    <Dashboard
      className="Dashboard"
      title="Dashboard"
      {...props}
      {...{ loading, error: fetchError, menu }}
      sideMenu
      bottomMenu
      dashboardType="editor"
    />
  );
}

export default EditorDashboard;
