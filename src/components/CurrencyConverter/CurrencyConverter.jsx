import { useEffect, useMemo } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

import { useCurrencyState } from 'hooks/useCurrencyState';

import Input from 'components/Input';
import Select from 'components/Select/Index';
import Spinner from 'components/Spinner';

import styles from './CurrencyConverter.module.scss';

export default function CurrencyConverter() {
  const { currencyState, onSelectCurrency, onChangeInput, setInitialCurrency } =
    useCurrencyState();

  const { response } = useExchangeRates();

  useEffect(() => {
    if (response && !currencyState.selectedCurrency) {
      const newSelectedCurrency = response.find(
        (currency) => currency.cc === 'USD'
      );
      setInitialCurrency(newSelectedCurrency);
    }
  }, [response, currencyState.selectedCurrency, setInitialCurrency]);

  const normalizedSelectOptions = useMemo(() => {
    if (response) {
      return response.map((currency) => ({
        value: currency.cc,
        label: currency.txt
      }));
    }
  }, [response]);

  if (!response) {
    return <Spinner />;
  }

  const handleInputChange = (event) => {
    const rate = currencyState.selectedCurrency.rate;
    const value = event.target.value;
    const name = event.target.name;

    let newFirstInputValue, newSecondInputValue;

    if (name === 'firstInput') {
      newFirstInputValue = value;
      newSecondInputValue = parseFloat((event.target.value / rate).toFixed(2));
    } else if (name === 'secondInput') {
      newSecondInputValue = value;
      newFirstInputValue = parseFloat((event.target.value * rate).toFixed(2));
    }

    onChangeInput(newFirstInputValue, newSecondInputValue);
  };

  const handleCurrencySelectChange = (value) => {
    const newSelectedCurrency = response.find(
      (currency) => currency.cc === value
    );

    if (newSelectedCurrency) {
      const newRate = newSelectedCurrency.rate;

      const newSecondInputValue = parseFloat(
        (currencyState.firstCurrencyInput / newRate).toFixed(2)
      );

      onSelectCurrency(newSecondInputValue, newSelectedCurrency);
    }
  };

  return (
    <div className={styles['currency-converter']}>
      <div className={styles['currency-converter__block-main']}>
        <Input
          type="number"
          name="firstInput"
          step="0.01"
          value={currencyState.firstCurrencyInput}
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
          value={currencyState.secondCurrencyInput}
          onChange={handleInputChange}
        />
        <Select
          onChange={handleCurrencySelectChange}
          options={normalizedSelectOptions}
          value={currencyState.selectedCurrency?.cc}
        ></Select>
      </div>
    </div>
  );
}
