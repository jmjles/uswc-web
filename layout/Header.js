import { Paper } from "@material-ui/core";
import Menu from "./Menu";
const Header = (props) => {
  return (
    <nav className="Header">
      <Menu token={props.token} user={props.user} />
    </nav>
  );
};

export default Header;
