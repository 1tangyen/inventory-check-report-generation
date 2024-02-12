import React from "react";
import Select from "react-select";

const FormMultiSelect = ({
  label,
  name,
  options,
  size,
  value,
  onChange,
  disabled,
}) => {
  // The options prop expected by react-select is an array of objects with 'value' and 'label' keys
  const selectOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  const customStyles = {
    // You can customize the styles of react-select components here
    control: (provided) => ({
      ...provided,
      // Add additional styles here
    }),
    // Other style overrides...
  };

  return (
    <div className={`form-control ${size}`}>
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <Select
        isMulti
        name={name}
        options={selectOptions}
        value={value}
        onChange={onChange}
        isDisabled={disabled} // Use the disabled prop to control the disabled state
        className="text-base-content"
        classNamePrefix="select"
        styles={customStyles}
        placeholder={` ${label}...`}
      />
    </div>
  );
};

export default FormMultiSelect;
