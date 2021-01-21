import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
const Page = (props) => {
  return (
    <>
      <Header />
      <Sidebar />
      {props.children}
      <Footer />
    </>
  );
};

export default Page;
