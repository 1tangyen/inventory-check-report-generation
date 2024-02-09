// const FormInput = ({ label, name, type, defaultValue, size }) => {
//   return (
//     <div className="form-control">
//       <label htmlFor={name} className="label">
//         <span className="label-text capitalize">{label}</span>
//       </label>
//       <input
//         type={type}
//         name={name}
//         defaultValue={defaultValue}
//         className={`input input-bordered ${size}`}
//       />
//     </div>
//   );
// };
// export default FormInput;

import React, { useState } from "react";

const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  size,
  suggestions = [],
}) => {
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Handler to update input value and filter suggestions
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter suggestions based on input value
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(value ? filtered : []);
  };

  // Handle selection from suggestions
  const handleSelect = (suggestion) => {
    setInputValue(suggestion); // Update the input field with the selected value
    setFilteredSuggestions([]); // Clear the suggestions
  };

  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        className={`input input-bordered ${size}`}
      />
      {filteredSuggestions.length > 0 && (
        <ul className="menu bg-base-100 w-full rounded-box mt-2">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} className="menu-item">
              <button type="button" onClick={() => handleSelect(suggestion)}>
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormInput;
