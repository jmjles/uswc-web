import { Tab, Tabs } from "@material-ui/core";
import React from "react";

const TopMenu = ({ tab, menu, handleTab }) => {
  return (
    <Tabs
      value={tab}
      onChange={handleTab}
      indicatorColor="primary"
      orientation="horizontal"
    >
      {menu.map((t) => (
        <Tab value={t.value} label={t.label} key={t.value} />
      ))}
    </Tabs>
  );
};

export default TopMenu;
