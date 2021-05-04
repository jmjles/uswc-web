import { Tab, Tabs } from "@material-ui/core";
import React from "react";

const SideMenu = ({tab,handleTab,menu}) => {
  return (
    <Tabs
      onChange={handleTab}
      value={tab}
      orientation="vertical"
      indicatorColor="primary"
    >
      {menu.map((i) => (
        <Tab label={i.label} value={i.value} key={i.value} />
      ))}
    </Tabs>
  );
};

export default SideMenu;
