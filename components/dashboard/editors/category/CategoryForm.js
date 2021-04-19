import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography as Font,
} from "@material-ui/core";
import React from "react";
import CategoryNavForm from "./CategoryNavForm";

const CategoryForm = ({
  handleChange,
  handleSubmit,
  name,
  order,
  step: [step, setStep],
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit} className={step === 1 ? "Active" : ""}>
      <Font variant="h1" style={{ marginBottom: "20px" }}>
        {edit ? "Edit Category" : "New Category"}
      </Font>
      <TextField
        name="name"
        label="Name"
        value={name}
        onChange={handleChange}
        color="primary"
        type="text"
        required
      />
      <Font variant="h6">Order By</Font>
      <RadioGroup value={order} onChange={handleChange} name="order">
        <FormControlLabel
          label="Most Recent"
          value="most_recent"
          control={<Radio required color="primary" />}
        />
        <FormControlLabel
          label="Chronological"
          value="chronological"
          control={<Radio color="primary" />}
        />
        <FormControlLabel
          label="Most Popular"
          value="most_popular"
          control={<Radio color="primary" />}
        />
      </RadioGroup>
      <CategoryNavForm step={[step, setStep]} />
    </form>
  );
};

export default CategoryForm;
