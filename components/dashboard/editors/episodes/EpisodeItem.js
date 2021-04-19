import { Button, Grid, Typography as Font } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import DeleteEpisode from "./DeleteEpisode";
import EditEpisode from "./EditEpisode";

const EpisodeItem = ({ episode = {}, refresh, series }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const handleShow = (Reset) => {
    setModal(!modal);
    if (modal) Reset();
  };
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
          <img src={episode.thumbnail} />
        </Grid>
        <Grid item>
          <Font variant="h2" className="Title">
            {episode.title}
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
        <EditEpisode
          e={episode}
          modal={modal}
          handleShow={handleShow}
          refresh={refresh}
          series={series}
        />
        <DeleteEpisode
          episodeId={episode._id}
          handleShow={handleDeleteShow}
          modal={modal2}
          refresh={refresh}
        />
      </Grid>
    </Grid>
  );
};

export default EpisodeItem;
