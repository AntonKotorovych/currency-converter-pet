import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const storedValue = localStorage.getItem(key);

  const [value, setValue] = useState(
    storedValue ? JSON.parse(storedValue) : initialValue
  );

  const saveToLocalStorage = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, saveToLocalStorage];
};
