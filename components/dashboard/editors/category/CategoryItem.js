import { Button, Grid, Typography as Font } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";

const CategoryItem = ({ category, refresh }) => {
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
          <Font variant="h2">{category.name}</Font>
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
        <EditCategory
          category={category}
          modal={modal}
          handleShow={handleShow}
          refresh={refresh}
        />
        <DeleteCategory
          categoryId={category._id}
          handleShow={handleDeleteShow}
          modal={modal2}
          refresh={refresh}
        />
      </Grid>
    </Grid>
  );
};

export default CategoryItem;
