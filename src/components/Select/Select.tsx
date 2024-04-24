import { memo } from 'react';

interface Option {
  value: string;
  label: string;
}

export interface Props {
  options?: Option[];
  value?: string;
  onChange?: (newValue: string) => void;
}

function Select({ options, onChange, value }: Props) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
