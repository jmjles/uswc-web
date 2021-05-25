import { Button, Fab, Grid, Typography as Font } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import Head from "next/head";
import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { server } from "../../../util/axios";
import EditInfo from "./EditInfo";
import InfoF from "./InfoF";
import RokuLink from "./RokuLink";

const Info = ({ user: [user, setUser] }) => {
  const { eModal, pModal, handleEModal, handlePModal } = InfoF();

  return (
    <div>
      <Head></Head>
      <Alert severity={user.sub ? "success" : "info"}>
        <Font>
          {user.sub
            ? "Thank you for supporting USWC. Enjoy."
            : "Subscribe for $4.99 to access exclusive content!"}
        </Font>
        {!user.sub && (
          <PayPalButton
            onApprove={async (data, actions) => {
              return actions.subscription.get().then(async (details) => {
                return server()
                  .put("/users", {
                    id: user._id,
                    transaction: data.subscriptionID,
                    orderId: data.orderID,
                    sub: true,
                  })
                  .then((data) => {
                    return setUser(data.data);
                  });
              });
            }}
            options={{
              clientId:
                "ASLnHaUznnrh1qkoSZdwVbsYuMCNFYC51IMwzsAHStskC9iKqbpwGF9kySEluXoFvuvgG5kOGmGlQsu0",
              vault: true,
              intent: "subscription",
            }}
            onError={(error) => {
              console.log(error);
            }}
            createSubscription={(data, actions) => {
              return actions.subscription.create({
                plan_id: "P-1S1923543H0199907MCUGBGI",
                intent: "subscription",
              });
            }}
            amount="4.99"
          />
        )}
      </Alert>
      <Grid container direction="column" alignItems="center">
        {user.subscribe && (
          <Grid item>
            <RokuLink user={[user, setUser]} />
          </Grid>
        )}

        <Grid item>
          <Fab color="primary" variant="round" onClick={handleEModal}>
            <Edit />
          </Fab>
          <Font variant="body1">First Name: {user.fname}</Font>
          <Font variant="body1">Last Name: {user.lname}</Font>
          <Font variant="body1">Username: {user.username}</Font>
          <Font variant="body1">Email: {user.email}</Font>
          <Font variant="body1">Gender: {user.gender}</Font>
          <Font variant="body1">Phone: {user.phone}</Font>
          <Font variant="body1">Age: {user.age}</Font>
          <Font variant="body1">Zip Code: {user.zip}</Font>
          <Button color="primary" variant="contained" onClick={handlePModal}>
            <Font variant="button">Change Password</Font>
          </Button>
        </Grid>
      </Grid>

      <EditInfo
        modal={eModal}
        handleModal={handleEModal}
        user={[user, setUser]}
      />
    </div>
  );
};

export default Info;
