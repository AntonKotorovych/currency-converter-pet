import clsx from 'clsx';

import { useState, useEffect } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import { useLocalStorage } from 'hooks/useLocalStorage';

import Input from 'components/Input';
import Select from 'components/Select/Index';
import CurrencyRateTable from 'components/CurrencyRateTable';
import Spinner from 'components/Spinner';

import styles from './CurrencyConverter.module.scss';

export default function CurrencyConverter() {
  const [currencyConverterState, setCurrencyConverterState] = useState({
    firstCurrencyInput: '',
    secondCurrencyInput: '',
    selectedCurrency: ''
  });
  const [firstInputValue, setFirstInputValue] = useLocalStorage(
    'firstInputValue',
    ''
  );
  const [secondInputValue, setSecondInputValue] = useLocalStorage(
    'secondInputValue',
    ''
  );

  const { response } = useExchangeRates();

  useEffect(() => {
    if (response && !currencyConverterState.selectedCurrency) {
      setCurrencyConverterState({
        firstCurrencyInput: firstInputValue,
        secondCurrencyInput: secondInputValue,
        selectedCurrency: response.find((currency) => currency.cc === 'USD')
      });
    }
  }, [
    response,
    currencyConverterState.selectedCurrency,
    firstInputValue,
    secondInputValue
  ]);

  if (!response) {
    return (
      <div
        className={clsx(
          styles['currency-converter-container'],
          styles['currency-converter-container--error']
        )}
      >
        <Spinner />
      </div>
    );
  }

  const handleInputChange = (event) => {
    const rate = currencyConverterState.selectedCurrency.rate;

    if (event.target.name === 'firstInput') {
      const newFirstInputValue = event.target.value;
      const newSecondInputValue = parseFloat(
        (event.target.value / rate).toFixed(2)
      );

      setCurrencyConverterState({
        ...currencyConverterState,
        firstCurrencyInput: newFirstInputValue,
        secondCurrencyInput: newSecondInputValue
      });

      setFirstInputValue(newFirstInputValue);
      setSecondInputValue(newSecondInputValue);
    } else if (event.target.name === 'secondInput') {
      const newSecondInputValue = event.target.value;
      const newFirstInputValue = parseFloat(
        (event.target.value * rate).toFixed(2)
      );

      setCurrencyConverterState({
        ...currencyConverterState,
        firstCurrencyInput: newFirstInputValue,
        secondCurrencyInput: newSecondInputValue
      });
      setFirstInputValue(newFirstInputValue);
      setSecondInputValue(newSecondInputValue);
    }
  };

  const handleCurrencySelectChange = (value) => {
    const newSelectedCurrency = response.find(
      (currency) => currency.cc === value
    );

    if (newSelectedCurrency) {
      const newRate = newSelectedCurrency.rate;

      setCurrencyConverterState({
        ...currencyConverterState,
        selectedCurrency: newSelectedCurrency,
        secondCurrencyInput: parseFloat(
          (currencyConverterState.firstCurrencyInput / newRate).toFixed(2)
        )
      });
    }
  };

  return (
    <div className={styles['currency-converter-container']}>
      <div className={styles['currency-converter']}>
        <div className={styles['currency-converter__block-main']}>
          <Input
            type="number"
            name="firstInput"
            step="0.01"
            value={currencyConverterState.firstCurrencyInput}
            onChange={handleInputChange}
          />
          <div>
            <h2>UAH</h2>
          </div>
        </div>
        <div className={styles['currency-converter__block-secondary']}>
          <Input
            type="number"
            step="0.01"
            name="secondInput"
            value={currencyConverterState.secondCurrencyInput}
            onChange={handleInputChange}
          />
          <Select
            onSelectChange={handleCurrencySelectChange}
            options={response}
          ></Select>
        </div>
      </div>
      <CurrencyRateTable currencyList={response} />
    </div>
  );
}
