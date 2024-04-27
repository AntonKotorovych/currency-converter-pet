import { useEffect, useState, useCallback } from 'react';
import { Currency } from 'types/interfaces/currency';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

interface CurrencyState {
  firstCurrencyInput: number;
  secondCurrencyInput: number;
  selectedCurrency: Currency | null;
}

interface Ratios {
  firstInput: {
    newFirstInputValue: number;
    newSecondInputValue: number;
  };
  secondInput: {
    newSecondInputValue: number;
    newFirstInputValue: number;
  };
}

interface ChangeInputParams {
  value: number;
  name: string;
}

const defaultStoreValue = {
  firstCurrencyInput: 0,
  secondCurrencyInput: 1,
  selectedCurrency: null
};

export const useCurrencyState = () => {
  const [currencyState, setCurrencyState] = useState<CurrencyState>(defaultStoreValue);

  const { response, error } = useExchangeRates();

  const onChangeInput = useCallback(
    ({ value, name }: ChangeInputParams) => {
      const rate = currencyState?.selectedCurrency?.rate;

      if (!rate) return;

      if (value < 0) return;

      const ratios: Ratios = {
        firstInput: {
          newFirstInputValue: value,
          newSecondInputValue: parseFloat((value / rate).toFixed(2))
        },
        secondInput: {
          newSecondInputValue: value,
          newFirstInputValue: parseFloat((value * rate).toFixed(2))
        }
      };

      const { newFirstInputValue, newSecondInputValue } = ratios[name as keyof Ratios] || {};

      setCurrencyState(prevState => ({
        ...prevState,
        firstCurrencyInput: newFirstInputValue,
        secondCurrencyInput: newSecondInputValue
      }));
    },
    [currencyState?.selectedCurrency]
  );

  const onSelectCurrency = useCallback((newSelectedCurrency: Currency) => {
    const newRate = newSelectedCurrency.rate;

    setCurrencyState(prevState => ({
      ...prevState,
      firstCurrencyInput: parseFloat((+prevState.secondCurrencyInput * newRate).toFixed(2)),
      selectedCurrency: newSelectedCurrency
    }));
  }, []);

  useEffect(() => {
    if (error) {
      localStorage.clear();
      setCurrencyState(() => defaultStoreValue);
    }
  }, [error]);

  useEffect(() => {
    if (response && !currencyState.selectedCurrency) {
      const defaultCurrency = response.find((currency: Currency) => currency.cc === 'USD');
      if (defaultCurrency) onSelectCurrency(defaultCurrency);
    }
  }, [response, currencyState.selectedCurrency, onSelectCurrency]);

  useEffect(() => {
    const storedCurrencyState = localStorage.getItem('currencyState');
    if (storedCurrencyState) setCurrencyState(JSON.parse(storedCurrencyState));
  }, []);

  useEffect(() => {
    if (currencyState.selectedCurrency) {
      localStorage.setItem('currencyState', JSON.stringify(currencyState));
    }
  }, [currencyState]);

  return { currencyState, onSelectCurrency, onChangeInput };
};
