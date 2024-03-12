import { useEffect, useState, useCallback } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import { DEFAULT_SECOND_INPUT_VALUE } from 'constants/constants';

export const useCurrencyState = () => {
  const [currencyState, setCurrencyState] = useState({
    firstCurrencyInput: '',
    secondCurrencyInput: '',
    selectedCurrency: null
  });

  const { response } = useExchangeRates();

  useEffect(() => {
    if (response && !currencyState.selectedCurrency) {
      const newSelectedCurrency = response.find(
        currency => currency.cc === 'USD'
      );
      setCurrencyState({
        firstCurrencyInput: parseFloat(
          (DEFAULT_SECOND_INPUT_VALUE * newSelectedCurrency.rate).toFixed(2)
        ),
        secondCurrencyInput: DEFAULT_SECOND_INPUT_VALUE,
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

  const onChangeInput = useCallback(
    event => {
      const rate = currencyState?.selectedCurrency?.rate;
      let { value, name } = event.target;

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

  const onSelectCurrency = useCallback(
    newSelectedCurrency => {
      const newRate = newSelectedCurrency.rate;

      const newSecondInputValue = parseFloat(
        (currencyState.firstCurrencyInput / newRate).toFixed(2)
      );

      setCurrencyState(prevState => ({
        ...prevState,
        secondCurrencyInput: newSecondInputValue,
        selectedCurrency: newSelectedCurrency
      }));
    },
    [currencyState]
  );

  return { currencyState, onSelectCurrency, onChangeInput };
};
