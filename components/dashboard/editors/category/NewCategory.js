import { useState, useRef } from "react";
import { server } from "../../../../util/axios";
import { createQuery } from "../../../../util";
import CategoryForm from "./CategoryForm";
import CategoryForm2 from "./CategoryForm2";
const NewCategory = ({ refresh }) => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [order, setOrder] = useState("");
  const [operator, setOperator] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [created, setCreated] = useState(false);
  const tagField = useRef("");

  const handleChange = ({ target: { name, value } }) => {
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
  const Reset = () => {
    setName("");
    setTags([]);
    setTag("");
    setOrder("");
    setOperator("");
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
          await server.post("/video/category", {
            name,
            order,
            query: createQuery(tags, operator),
          });
          refresh();
          setLoading(false);
          setShow(true);
          setCreated(true);
          setTimeout(Reset, 3000);
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

  const commonFields = { handleSubmit, handleChange, step: [step, setStep] };
  return (
    <div>
      <CategoryForm {...commonFields} name={name} order={order} />
      <CategoryForm2
        {...commonFields}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        tags={tags}
        tag={tag}
        tagField={tagField}
        loading={loading}
        created={created}
        show={show}
      />
    </div>
  );
};

export default NewCategory;
