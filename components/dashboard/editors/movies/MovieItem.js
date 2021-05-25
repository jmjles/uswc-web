import { Button, Grid, Typography as Font } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import DeleteMovie from "./DeleteMovie";
import EditMovie from "./EditMovie";
const MovieItem = ({ movie = {}, refresh }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const handleShow = () => setModal(!modal);

  const handleDeleteShow = () => {
    setModal2(!modal2);
  };
  return (
    <Grid item>
      <Grid
        container
        justify="space-between"
        direction="row"
        alignItems="center"
        wrap="nowrap"
        spacing={3}
      >
        <Grid item>
          <img src={movie.thumbnail} />
        </Grid>
        <Grid item>
          <Font variant="h2" className="Title">
            {movie.title}
          </Font>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justify="space-around">
            <Grid item>
              <Button onClick={handleShow}>
                <Edit />
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleDeleteShow}>
                <Delete />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <EditMovie
          m={movie}
          modal={modal}
          handleShow={handleShow}
          refresh={refresh}
        />
        <DeleteMovie
          movieId={movie._id}
          handleShow={handleDeleteShow}
          modal={modal2}
          refresh={refresh}
        />
      </Grid>
    </Grid>
  );
};

export default MovieItem;
