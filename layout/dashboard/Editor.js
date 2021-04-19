import { Grid, Slide, Tab, Tabs } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import Content from "../Content";
import {
  AddBox,
  Create,
  Edit,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";
import NewVideo from "../../components/dashboard/editors/videos/NewVideo";

const Editor = (props) => {
  const [tab, setTab] = useState("video");
  const [menu, setMenu] = useState(true);
  const [subMenu, setSubMenu] = useState(true);
  const handleMenu = () => setMenu(!menu);
  const handleTabs = (e) => console.log(e);
  return (
    <Dashboard className="Editor" title="Dashboard" {...props}>
      <Grid container>
        <Grid item>
          <Grid container alignItems="center">
            <Slide direction="right" in={menu}>
              <Grid item>
                <Tabs
                  value={tab}
                  indicatorColor="primary"
                  orientation="vertical"
                >
                  <Tab label="Video" color="primary" value="video" />
                  <Tab label="Movie" color="primary" value="movie" />
                  <Tab label="Series" color="primary" value="series" />
                  <Tab label="Episode" color="primary" value="episode" />
                  <Tab label="Categories" color="primary" value="Categories" />
                </Tabs>
              </Grid>
            </Slide>
            <Slide in={menu}>
              <Grid item>
                <div onClick={handleMenu}>
                  <NavigateBefore style={!menu ? { display: "none" } : null} />
                  <NavigateNext style={menu ? { display: "none" } : null} />
                </div>
              </Grid>
            </Slide>
          </Grid>
        </Grid>
        <Grid item>
          <TabContext value={tab}>
            <TabPanel value="video">
              <Grid container>
                <Grid item>
                  <TabContext>
                    <TabPanel value="newVideo">
                      <NewVideo />
                    </TabPanel>
                  </TabContext>
                </Grid>
                <Grid item>
                  <Tabs>
                    <Tab icon={<AddBox />} label="Create" />
                    <Tab icon={<Edit />} label="Edit" />
                  </Tabs>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="video2">
              <h1>tedst</h1>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default Editor;
