import { Grid } from "@material-ui/core";
import CategoryItem from "./CategoryItem";

const Category = ({ categories = [], refresh }) => {
  return (
    <Grid container direction="column" spacing={2}>
      {categories.map((c) => (
        <CategoryItem category={c} key={c._id} refresh={refresh} />
      ))}
    </Grid>
  );
};

export default Category;
