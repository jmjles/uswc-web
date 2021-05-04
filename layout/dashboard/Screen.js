import { TabContext, TabPanel } from "@material-ui/lab";
import React from "react";

const Screen = ({ subTab, tab, menu, bottomMenu }) => {
  return (
    <TabContext value={bottomMenu ? subTab : tab}>
      {menu.map((i) => (
        <div key={i.value}>
          {bottomMenu ? (
            <>
              <TabPanel value={`${i.value} edit`}>{i.edit}</TabPanel>
              <TabPanel value={`${i.value} create`}>{i.create}</TabPanel>
            </>
          ) : (
            <TabPanel value={i.value}>{i.component}</TabPanel>
          )}
        </div>
      ))}
    </TabContext>
  );
};

export default Screen;
