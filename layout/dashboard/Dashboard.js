import {
  Avatar,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography as Font,
} from "@material-ui/core";
import { AddBox, Edit } from "@material-ui/icons";
import { TabContext, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import Content from "../Content";

const Dashboard = ({ user, title, className, children, menu }) => {
  const [tab, setTab] = useState(menu[0].value);
  const [subTab, setSubTab] = useState(`${tab} edit`);
  const handleTab = (e, value) => {
    setTab(value);
    setSubTab(`${value} edit`);
  };
  const handleSubTab = (e, value) => setSubTab(value);
  return (
    <Content title={title} className={className}>
      <Grid container justify="flex-end">
        <Grid item>
          <Grid container alignItems="center" justify="space-around">
            <Grid item>
              <Font variant="body1">Welcome, {user[0].fname}</Font>
            </Grid>
            <Grid item>
              <Avatar src={user[0].pic} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {children}
      <Grid container wrap="nowrap">
        <Grid item className="Menu">
          <Tabs
            onChange={handleTab}
            value={tab}
            orientation="vertical"
            indicatorColor="primary"
          >
            {menu.map((i) => (
              <Tab
                label={i.label}
                value={i.value}
                color={i.color}
                key={i.value}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item className="Content">
          <Grid container direction="column" alignContent="center">
            <Grid item>
              <TabContext value={subTab}>
                {menu.map((i) => (
                  <div key={i.value}>
                    <TabPanel value={`${i.value} edit`}>{i.edit}</TabPanel>
                    <TabPanel value={`${i.value} create`}>{i.create}</TabPanel>
                  </div>
                ))}
              </TabContext>
            </Grid>
            <Grid item>
              <Grid container justify="center">
                <Grid item>
                  <Tabs
                    onChange={handleSubTab}
                    value={subTab}
                    indicatorColor="primary"
                  >
                    <Tab label="Edit" icon={<Edit />} value={`${tab} edit`} />
                    <Tab
                      label="Create"
                      icon={<AddBox />}
                      value={`${tab} create`}
                    />
                  </Tabs>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Content>
  );
};

export default Dashboard;
