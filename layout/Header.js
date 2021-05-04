import Menu from "./Menu";
const Header = (props) => {
  return (
    <nav className="Header">
      <Menu user={props.user} />
    </nav>
  );
};

export default Header;
