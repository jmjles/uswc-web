import {
  Typography as Font,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  TextField,
  Chip,
  Collapse,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React from "react";
import CategoryNavForm from "./CategoryNavForm";
const CategoryForm2 = ({
  handleChange,
  handleSubmit,
  step: [step, setStep],
  loading,
  operator,
  tagField,
  tag,
  tags,
  handleAdd,
  handleDelete,
  created,
  show,
}) => {
  return (
    <form onSubmit={handleSubmit} className={step === 2 ? "Active" : ""}>
      <Font variant="h1" style={{ marginBottom: "20px" }}>
        Submit Category
      </Font>
      <div
        style={
          loading
            ? { textAlign: "center", marginBottom: "20px" }
            : { display: "none" }
        }
      >
        <CircularProgress />
      </div>
      <Font variant="h6">Combine Tags</Font>
      <RadioGroup value={operator} onChange={handleChange} name="operator">
        <FormControlLabel
          label="And"
          value="AND"
          control={<Radio required color="primary" />}
        />
        <FormControlLabel
          label="Or"
          value="OR"
          control={<Radio required color="primary" />}
        />
      </RadioGroup>
      <Grid container alignItems="flex-end">
        <Grid item>
          <TextField
            name="tag"
            inputRef={tagField}
            label="Tag"
            value={tag}
            onChange={handleChange}
            color="primary"
            type="text"
          />
        </Grid>
        <Grid item>
          <Button color="primary" size="small" onClick={handleAdd}>
            <Add />
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        {tags.map((t) => (
          <Grid item key={t}>
            <Chip label={t} onDelete={() => handleDelete(t)} color="primary" />
          </Grid>
        ))}
      </Grid>
      <Collapse in={show}>
        <Alert severity={created ? "success" : "error"}>
          {created ? "Category has been saved" : "An error has occurred"}
        </Alert>
      </Collapse>
      <CategoryNavForm step={[step, setStep]} />
    </form>
  );
};

export default CategoryForm2;
