export default function Select({ options, onChange, value }) {
  const handleSelectChange = (event) => {
    const newValue = event.target.value;

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="input-container">
      <select value={value} onChange={handleSelectChange}>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
