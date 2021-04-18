import { Grid } from "@material-ui/core";
import MovieItem from "./MovieItem";
const Movies = ({ movies = [], refresh }) => {
  return (
    <Grid container direction="column" spacing={2}>
      {movies.map((m) => (
        <MovieItem movie={m} key={m._id} refresh={refresh} />
      ))}
    </Grid>
  );
};

export default Movies;
