import { Grid } from "@material-ui/core";

import EpisodeItem from "./EpisodeItem";

const Episodes = ({ episodes = [], refresh, series }) => {
  return (
    <Grid container direction="column" spacing={2}>
      {episodes.map((e) => (
        <EpisodeItem
          episode={e}
          key={e._id}
          refresh={refresh}
          series={series}
        />
      ))}
    </Grid>
  );
};

export default Episodes;
