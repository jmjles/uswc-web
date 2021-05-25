import { Backdrop, Fade, Modal } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { createQuery, getTagsAndOp } from "../../../../util";
import { server } from "../../../../util/axios";
import CategoryForm from "./CategoryForm";
import CategoryForm2 from "./CategoryForm2";

const EditCategory = ({ category, modal, handleShow, refresh }) => {
  const [name, setName] = useState(category.name || "");
  const [tags, setTags] = useState(getTagsAndOp(category.query).tags);
  const [tag, setTag] = useState("");
  const [order, setOrder] = useState(category.order || "");
  const [operator, setOperator] = useState(
    getTagsAndOp(category.query).operator
  );

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);
  const [created, setCreated] = useState(false);
  const tagField = useRef("");

  const handleChange = ({ target: { name, value, files } }) => {
    if (show) setShow(false);
    switch (name) {
      case "name":
        setName(value);
        break;
      case "order":
        setOrder(value);
        break;
      case "tag":
        setTag(value.trim().toLowerCase());
        break;
      case "operator":
        setOperator(value);
        break;
      default:
        console.log("Wrong type");
        console.log(name);
    }
  };
  const handleDelete = (key) => {
    setTags(tags.filter((t) => t !== key));
  };

  const handleAdd = () => {
    const value = tagField.current.value;
    if (value.length > 1) {
      setTags([...tags, value]);
      setTag("");
    }
  };
  useEffect(() => {
    setName(category.name || "");
    setTags(getTagsAndOp(category.query).tags);
    setTag("");
    setOrder(category.order || "");
    setOperator(getTagsAndOp(category.query).operator);
    if (!modal) {
      setShow(false);
      setLoading(false);
      setStep(1);
      setCreated(false);
    }
  }, [category, modal]);
  const Reset = () => {
    handleShow();
    setName(category.name || "");
    setTags(getTagsAndOp(category.query).tags);
    setTag("");
    setOrder(category.order || "");
    setOperator(getTagsAndOp(category.query).operator);
    setShow(false);
    setLoading(false);
    setStep(1);
    setCreated(false);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (step === 2) {
        if (tags.length < 1) {
          alert("You must enter at least one tag.");
        } else {
          setLoading(true);
          const query = createQuery(tags, operator);
          let values = { id: category._id };
          if (name !== category.name) values.name = name;
          if (order !== category.order) values.order = order;
          if (query !== category.query) values.query = query;
          await server.put("/video/category", { ...values });
          await refresh();
          setLoading(false);
          setShow(true);
          setCreated(true);
          setTimeout(handleShow, 3000);
        }
      } else {
        setStep(step + 1);
      }
    } catch (er) {
      setShow(true);
      setCreated(false);
      setLoading(false);
      console.log(er);
    }
  };
  const commonFields = {
    handleSubmit,
    handleChange,
    step: [step, setStep],
  };
  return (
    <Modal
      open={modal}
      onClose={Reset}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      className="Modal"
    >
      <Fade in={modal}>
        <>
          <CategoryForm {...commonFields} name={name} order={order} edit />
          <CategoryForm2
            {...commonFields}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            operator={operator}
            tags={tags}
            tag={tag}
            tagField={tagField}
            show={show}
            loading={loading}
            created={created}
          />
        </>
      </Fade>
    </Modal>
  );
};

export default EditCategory;
