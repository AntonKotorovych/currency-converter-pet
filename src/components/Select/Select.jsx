import { memo } from 'react';
import PropTypes from 'prop-types';

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  value: PropTypes.string,
  onChange: PropTypes.func
};

function Select({ options, onChange, value }) {
  const handleSelectChange = event => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="input-container">
      <select value={value} onChange={handleSelectChange}>
        {options?.map(option => {
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

export default memo(Select);
