import { CircularProgress, Grid } from "@material-ui/core";
import { useState } from "react";
import DashboardF from "../../components/dashboard/DashboardF";
import Content from "../Content";
import BottomMenu from "./BottomMenu";
import Screen from "./Screen";
import SideMenu from "./SideMenu";
import Status from "./Status";
import TopMenu from "./TopMenu";
import User from "./User";

const Dashboard = (props) => {
  const {
    user,
    title,
    className,
    menu = [],
    loading,
    error,
    sideMenu = false,
    topMenu = false,
    bottomMenu = false,
    child = false,
  } = props;

  const { tab, subTab, handleTab, handleSubTab, showDash } = DashboardF(props);

  return (
    <>
      {!showDash ? (
        <CircularProgress color="primary" />
      ) : (
        <Content title={title} className={className}>
          {!child && <User fname={user[0].fname} pic={user[0].pic} />}
          {topMenu && <TopMenu {...{ tab, handleTab, menu }} />}
          <Status {...{ loading, error }} />
          <Grid container wrap="nowrap">
            <Grid item className="Menu">
              {sideMenu && <SideMenu {...{ handleTab, tab, menu }} />}
            </Grid>
            <Grid item className="Content">
              <Grid container direction="column" alignContent="center">
                <Grid item>
                  <Screen {...{ subTab, tab, menu, bottomMenu }} />
                </Grid>
                <Grid item>
                  <Grid container justify="center">
                    <Grid item>
                      {bottomMenu && (
                        <BottomMenu
                          {...{ handleSubTab, subTab, tab, bottomMenu }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Content>
      )}
    </>
  );
};

export default Dashboard;
