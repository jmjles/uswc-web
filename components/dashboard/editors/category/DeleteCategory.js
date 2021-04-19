import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  Typography as Font,
} from "@material-ui/core";
import { Cancel, Check } from "@material-ui/icons";
import React from "react";
import { server } from "../../../../util/axios";

const DeleteCategory = ({ modal, handleShow, categoryId, refresh }) => {
  const handleDelete = async () => {
    try {
      console.log(categoryId);
      await server.delete(`/video/category/${categoryId}`);
      await refresh();
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <Modal
      open={modal}
      onClose={handleShow}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      className="DeleteModal"
    >
      <Fade in={modal}>
        <div className="Content">
          <Font variant="h2">Confirm Deletion</Font>
          <Grid container justify="space-around">
            <Grid item>
              <Button onClick={handleShow}>
                <Font variant="button">Cancel</Font>
                <Cancel />
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={handleDelete}>
                <Font variant="button">Delete</Font>
                <Check />
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteCategory;
