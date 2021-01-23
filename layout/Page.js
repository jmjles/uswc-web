import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
const Page = (props) => {
  return (
    <div className="PageLayout">
      <Header />
      <Sidebar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Page;
