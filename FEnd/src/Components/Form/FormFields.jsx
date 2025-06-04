import React from "react";

const FormFields = ({ formData, handleChange, formFields }) => {
  return (
    <>
      {formFields.map((field) => {
        const {
          label,
          name,
          type,
          placeholder,
          options = [],
          min,
          max,
          step,
        } = field;

        const commonProps = {
          className: "form-input",
          name,
          value: formData[name],
          onChange: handleChange,
          required: name !== "company",
          placeholder,
        };

        return (
          <div key={name} className="form-group">
            {type === "textarea" ||
            type === "text" ||
            type === "email" ||
            type === "password" ? (
              <div className="relative w-full mt-6">
                {type === "textarea" ? (
                  <>
                    <textarea
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder=" "
                      required={name !== "company"}
                      className="peer w-full px-3 pt-6 pb-2 text-white bg-white/10 rounded-md border border-white/30 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label
                      htmlFor={name}
                      className="absolute left-3 top-1.5 text-white/70 text-sm transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-white/40
              peer-focus:top-1.5
              peer-focus:text-sm
              peer-focus:text-white"
                    >
                      {label}
                    </label>
                  </>
                ) : (
                  <>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder=" "
                      required={name !== "company"}
                      className="peer w-full px-3 pt-6 pb-2 text-white bg-white/10 rounded-md border border-white/30 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label
                      htmlFor={name}
                      className="absolute left-3 top-1.5 text-white/70 text-sm transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-white/40
              peer-focus:top-1
              peer-focus:text-sm
              peer-focus:text-white"
                    >
                      {label}
                    </label>
                  </>
                )}
              </div>
            ) : (
              // Handle checkbox, radio, range, etc. the same way as before
              <div className="text-white">/* your other input logic */</div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default FormFields;
