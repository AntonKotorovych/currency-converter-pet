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

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const { name, value } = event.target;

      onChangeInput({ name, value: parseFloat(value) });
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
          data-testid="firstInput"
        />
        <label htmlFor="firstInput">UAH</label>
      </div>
      <div className={styles['currency-converter__block-secondary']}>
        <Input
          type="number"
          name="secondInput"
          id="secondInput"
          step="0.01"
          value={currencyState.secondCurrencyInput}
          onChange={handleInputChange}
          data-testid="secondInput"
        />
        <CurrencySelect value={currencyState.selectedCurrency?.cc} onChange={onSelectCurrency} />
      </div>
    </div>
  );
}
