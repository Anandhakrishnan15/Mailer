import React, { useState } from "react";
import FormFields from "./FormFields";

const formFieldsData = [
  { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
  {
    label: "About",
    name: "about",
    type: "textarea",
    placeholder: "Tell us about yourself",
  },
  {
    label: "Gender",
    name: "gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    label: "Interests",
    name: "interests",
    type: "checkbox",
    options: [
      { label: "Coding", value: "coding" },
      { label: "Design", value: "design" },
    ],
  },
  {
    label: "Satisfaction Level",
    name: "satisfaction",
    type: "range",
    min: 1,
    max: 10,
    step: 1,
  },
];

const initialData = {
  name: "",
  about: "",
  gender: "",
  interests: [],
  satisfaction: 5,
};

const FormPage = () => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormFields
        formData={formData}
        handleChange={handleChange}
        formFields={formFieldsData}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormPage;
