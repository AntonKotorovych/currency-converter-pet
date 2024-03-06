import { useEffect, useState } from 'react';

export default function Select({ options, onSelectChange, value }) {
  const [selectedValue, setSelectedValue] = useState('USD');

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    if (onSelectChange) {
      onSelectChange(newValue);
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
