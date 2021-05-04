import { Tab, Tabs } from "@material-ui/core";
import { AddBox, Edit } from "@material-ui/icons";
import React from "react";

const BottomMenu = ({ handleSubTab, subTab, tab }) => {
  return (
    <Tabs onChange={handleSubTab} value={subTab} indicatorColor="primary">
      <Tab label="Edit" icon={<Edit />} value={`${tab} edit`} />
      <Tab label="Create" icon={<AddBox />} value={`${tab} create`} />
    </Tabs>
  );
};

export default BottomMenu;
