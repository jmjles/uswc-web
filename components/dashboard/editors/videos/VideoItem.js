import { Button, Grid, Typography as Font } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import DeleteVideo from "./DeleteVideo";
import EditVideo from "./EditVideo";
const VideoItem = ({ video = {}, refresh }) => {
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
          <img src={video.thumbnail} />
        </Grid>
        <Grid item>
          <Font variant="h2" className="Title">
            {video.title}
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
        <EditVideo
          v={video}
          modal={modal}
          handleShow={handleShow}
          refresh={refresh}
        />
        <DeleteVideo
          videoId={video._id}
          handleShow={handleDeleteShow}
          modal={modal2}
          refresh={refresh}
        />
      </Grid>
    </Grid>
  );
};

export default VideoItem;
