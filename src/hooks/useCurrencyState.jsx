import { useEffect, useState } from 'react';

export const useCurrencyState = () => {
  const [currencyState, setCurrencyState] = useState({
    firstCurrencyInput: '',
    secondCurrencyInput: '',
    selectedCurrency: undefined
  });

  useEffect(() => {
    const storedCurrencyState = localStorage.getItem('currencyState');
    if (storedCurrencyState) setCurrencyState(JSON.parse(storedCurrencyState));
  }, []);

  const onSelectCurrency = (newSecondInputValue, newSelectedCurrency) => {
    setCurrencyState({
      ...currencyState,
      secondCurrencyInput: newSecondInputValue,
      selectedCurrency: newSelectedCurrency
    });
  };

  const onChangeInput = (newFirstInputValue, newSecondInputValue) => {
    setCurrencyState({
      ...currencyState,
      firstCurrencyInput: newFirstInputValue,
      secondCurrencyInput: newSecondInputValue
    });
  };

  const setInitialCurrency = (initialCurrency) => {
    setCurrencyState({
      ...currencyState,
      selectedCurrency: initialCurrency
    });
  };

  useEffect(() => {
    localStorage.setItem('currencyState', JSON.stringify(currencyState));
  }, [currencyState]);

  return { currencyState, onSelectCurrency, onChangeInput, setInitialCurrency };
};
