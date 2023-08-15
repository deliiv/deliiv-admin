import React, { useState } from 'react';

function RadioButtonGroup({ options, selectedValue, onChange }) {
  const [value, setValue] = useState(selectedValue);

  function handleChange(event) {
    setValue(event.target.value);
    onChange(event.target.value);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
            style={{ margin:'20px' }}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}

export default RadioButtonGroup;
