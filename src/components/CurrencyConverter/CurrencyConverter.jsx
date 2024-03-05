import { useState, useEffect } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

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

  const { response } = useExchangeRates();

  useEffect(() => {
    if (response && !currencyConverterState.selectedCurrency) {
      setCurrencyConverterState({
        firstCurrencyInput: '',
        secondCurrencyInput: '',
        selectedCurrency: response.find((currency) => currency.cc === 'USD')
      });
    }
  }, [response, currencyConverterState.selectedCurrency]);

  if (!response) {
    return (
      <div className={styles['currency-converter-container']}>
        <Spinner />
      </div>
    );
  }

  const handleInputChange = (event) => {
    const rate = currencyConverterState.selectedCurrency.rate;

    if (event.target.name === 'firstInput') {
      setCurrencyConverterState({
        ...currencyConverterState,
        firstCurrencyInput: event.target.value,
        secondCurrencyInput: parseFloat((event.target.value / rate).toFixed(2))
      });
    } else if (event.target.name === 'secondInput') {
      setCurrencyConverterState({
        ...currencyConverterState,
        firstCurrencyInput: parseFloat((event.target.value * rate).toFixed(2)),
        secondCurrencyInput: event.target.value
      });
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
            name="firstInput"
            value={currencyConverterState.firstCurrencyInput}
            onChange={handleInputChange}
          />
          <div>
            <h2>UAH</h2>
          </div>
        </div>
        <div className={styles['currency-converter__block-secondary']}>
          <Input
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
