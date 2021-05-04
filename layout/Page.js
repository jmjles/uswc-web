import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Button, Modal, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Error } from "@material-ui/icons";

const Page = (props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const legal = localStorage.getItem("ald");
    if (!legal) {
      setOpen(true);
    }
  }, []);
  const handleClose = () => {
    const legal = localStorage.getItem("ald");
    legal ? setOpen(!open) : history.back();
  };
  const handleConfirm = () => {
    localStorage.setItem("ald", "true");
    setOpen(!open);
  };
  return (
    <div className="PageLayout">
      <Header user={props.user} />
      <Sidebar user={props.user} />
      <Modal open={open} onClose={handleClose}>
        <div className="LegalModal">
          <Error color="primary" />
          <Typography variant="body1">
            This site contains mature content. <br />
            Are you 18 or over?
          </Typography>
          <div>
            <Button onClick={handleClose} variant="contained">
              I'm not
            </Button>
            <Button onClick={handleConfirm} color="primary" variant="contained">
              Yes, I am
            </Button>
          </div>
        </div>
      </Modal>
      <div className={props.className ? props.className : ""}>
        {props.children}
      </div>

      <Footer />
    </div>
  );
};
export default Page;
