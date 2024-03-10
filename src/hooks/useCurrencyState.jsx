import { useEffect, useState } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

export const useCurrencyState = () => {
  const [currencyState, setCurrencyState] = useState({
    firstCurrencyInput: '',
    secondCurrencyInput: '',
    selectedCurrency: undefined
  });

  const { response } = useExchangeRates();

  useEffect(() => {
    if (response && !currencyState.selectedCurrency) {
      const newSelectedCurrency = response.find(
        currency => currency.cc === 'USD'
      );
      setCurrencyState({
        ...currencyState,
        secondCurrencyInput: 1,
        selectedCurrency: newSelectedCurrency
      });
    }
  }, [response, currencyState.selectedCurrency, currencyState]);

  useEffect(() => {
    const storedCurrencyState = localStorage.getItem('currencyState');
    if (storedCurrencyState) setCurrencyState(JSON.parse(storedCurrencyState));
  }, []);

  useEffect(() => {
    localStorage.setItem('currencyState', JSON.stringify(currencyState));
  }, [currencyState]);

  const onChangeInput = (newFirstInputValue, newSecondInputValue) => {
    setCurrencyState({
      ...currencyState,
      firstCurrencyInput: newFirstInputValue,
      secondCurrencyInput: newSecondInputValue
    });
  };

  const onSelectCurrency = newSelectedCurrency => {
    const newRate = newSelectedCurrency.rate;

    const newSecondInputValue = parseFloat(
      (currencyState.firstCurrencyInput / newRate).toFixed(2)
    );

    setCurrencyState({
      ...currencyState,
      secondCurrencyInput: newSecondInputValue,
      selectedCurrency: newSelectedCurrency
    });
  };

  return { currencyState, onSelectCurrency, onChangeInput };
};
