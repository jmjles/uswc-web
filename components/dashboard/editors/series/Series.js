import { Grid } from "@material-ui/core";
import SeriesItem from "./SeriesItem";

const Series = ({ series = [], refresh }) => {
  return (
    <Grid container direction="column" spacing={2}>
      {series.map((s) => (
        <SeriesItem series={s} key={s._id} refresh={refresh} />
      ))}
    </Grid>
  );
};

export default Series;
