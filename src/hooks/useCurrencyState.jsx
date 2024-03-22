import { useEffect, useState, useCallback } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

export const useCurrencyState = () => {
  const [currencyState, setCurrencyState] = useState({
    firstCurrencyInput: '',
    secondCurrencyInput: 1,
    selectedCurrency: null
  });

  const { response, error } = useExchangeRates();

  const onChangeInput = useCallback(
    ({ value, name }) => {
      const rate = currencyState?.selectedCurrency?.rate;

      if (value < 0) return;

      const ratios = {
        firstInput: {
          newFirstInputValue: value,
          newSecondInputValue: parseFloat((value / rate).toFixed(2))
        },
        secondInput: {
          newSecondInputValue: value,
          newFirstInputValue: parseFloat((value * rate).toFixed(2))
        }
      };

      const { newFirstInputValue, newSecondInputValue } = ratios[name] || {};

      setCurrencyState(prevState => ({
        ...prevState,
        firstCurrencyInput: newFirstInputValue,
        secondCurrencyInput: newSecondInputValue
      }));
    },
    [currencyState?.selectedCurrency]
  );

  const onSelectCurrency = useCallback(newSelectedCurrency => {
    const newRate = newSelectedCurrency.rate;

    setCurrencyState(prevState => ({
      ...prevState,
      firstCurrencyInput: parseFloat(
        (prevState.secondCurrencyInput * newRate).toFixed(2)
      ),
      selectedCurrency: newSelectedCurrency
    }));
  }, []);

  useEffect(() => {
    if (error) {
      localStorage.clear();
      setCurrencyState(() => ({
        firstCurrencyInput: '',
        secondCurrencyInput: '',
        selectedCurrency: null
      }));
    }
  }, [error]);

  useEffect(() => {
    if (response && !currencyState.selectedCurrency)
      onSelectCurrency(response.find(currency => currency.cc === 'USD'));
  }, [response, currencyState.selectedCurrency, onSelectCurrency]);

  useEffect(() => {
    const storedCurrencyState = localStorage.getItem('currencyState');
    if (storedCurrencyState) setCurrencyState(JSON.parse(storedCurrencyState));
  }, []);

  useEffect(() => {
    localStorage.setItem('currencyState', JSON.stringify(currencyState));
  }, [currencyState]);

  return { currencyState, onSelectCurrency, onChangeInput };
};
