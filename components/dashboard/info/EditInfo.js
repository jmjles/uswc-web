import {
  Backdrop,
  Button,
  CircularProgress,
  Collapse,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import EditInfoF from "./EditInfoF";

const EditInfo = (props) => {
  const { modal, handleModal } = props;
  const {
    fname,
    lname,
    username,
    email,
    gender,
    age,
    phone,
    zip,
    message,
    success,
    loading,
    handleChange,
    handleSubmit,
  } = EditInfoF({ ...props });
  return (
    <Modal
      open={modal}
      onClose={handleModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      className="Modal"
    >
      <Fade in={modal}>
        <form className="Active" onSubmit={handleSubmit}>
          {loading && <CircularProgress color="primary" />}
          <TextField
            label="First Name"
            name="fname"
            value={fname}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            name="lname"
            value={lname}
            onChange={handleChange}
            required
          />
          <TextField
            label="Username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            required
          />
          <TextField
            label="Gender"
            name="gender"
            value={gender}
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            type="tel"
          />
          <TextField
            label="Age"
            name="age"
            value={age}
            onChange={handleChange}
            type="number"
          />
          <TextField
            label="Zip Code"
            name="zip"
            value={zip}
            onChange={handleChange}
            type="number"
          />
          <Collapse in={message}>
            <Alert severity={success ? "success" : "error"}>
              <Typography variant="body1">
                {success ? "Changes Saved" : "An error has occurred"}
              </Typography>
            </Alert>
          </Collapse>
          <Button variant="contained" color="primary" type="submit">
            <Typography variant="button">Submit</Typography>
          </Button>
        </form>
      </Fade>
    </Modal>
  );
};

export default EditInfo;
