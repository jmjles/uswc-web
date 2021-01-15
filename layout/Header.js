import { Paper } from "@material-ui/core";
import Menu from "./Menu";
import Sidebar from "./Sidebar";
const Header = () => {
  return (
    <nav className="Header">
      <Menu />
      <Sidebar />
    </nav>
  );
};

export default Header;
