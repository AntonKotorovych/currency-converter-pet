import { useEffect, useMemo } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

import { useCurrencyState } from 'hooks/useCurrencyState';

import Input from 'components/Input';
import Select from 'components/Select/Index';
import Spinner from 'components/Spinner';

import styles from './CurrencyConverter.module.scss';

export default function CurrencyConverter() {
  const { currencyState, onSelectCurrency, onChangeInput } = useCurrencyState();

  const { response } = useExchangeRates();

  const normalizedSelectOptions = useMemo(() => {
    if (response) {
      return response.map(currency => ({
        value: currency.cc,
        label: currency.txt
      }));
    }
  }, [response]);

  if (!response) {
    return <Spinner />;
  }

  const handleInputChange = event => {
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

  const handleSelectCurrency = value => {
    const newSelectedCurrency = response.find(
      currency => currency.cc === value
    );

    if (newSelectedCurrency) onSelectCurrency(newSelectedCurrency);
  };

  return (
    <div className={styles['currency-converter']}>
      <div className={styles['currency-converter__block-main']}>
        <Input
          type="number"
          name="firstInput"
          id="firstInput"
          step="0.01"
          value={currencyState.firstCurrencyInput}
          onChange={handleInputChange}
        />
        <label htmlFor="firstInput">UAH</label>
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
          onChange={handleSelectCurrency}
          options={normalizedSelectOptions}
          value={currencyState.selectedCurrency?.cc}
        />
      </div>
    </div>
  );
}
