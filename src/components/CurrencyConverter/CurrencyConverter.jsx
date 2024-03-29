import { useCallback } from 'react';

import { useExchangeRates } from 'store/ExchangeRatesProvider';
import { useCurrencyState } from 'hooks/useCurrencyState';

import Input from 'components/Input';
import CurrencySelect from 'components/CurrencySelect';
import Spinner from 'components/Spinner';

import styles from './CurrencyConverter.module.scss';

export default function CurrencyConverter() {
  const { currencyState, onChangeInput, onSelectCurrency } = useCurrencyState();

  const { isLoading } = useExchangeRates();

  const handleInputChange = useCallback(
    event => {
      const { name, value } = event.target;

      onChangeInput({ name, value });
    },
    [onChangeInput]
  );

  if (isLoading) {
    return <Spinner />;
  }

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
        <CurrencySelect
          value={currencyState.selectedCurrency?.cc}
          onChange={onSelectCurrency}
        />
      </div>
    </div>
  );
}
