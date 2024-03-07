import { useState } from 'react';

export default function Select({ options, onChange, value }) {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="input-container">
      <select value={selectedValue} onChange={handleSelectChange}>
        {options.map((currency) => {
          return (
            <option value={currency.cc} key={currency.cc}>
              {currency.txt}
            </option>
          );
        })}
      </select>
    </div>
  );
}
