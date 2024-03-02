import clsx from 'clsx';
import { useState } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

import styles from './CurrencyConverter.module.scss';

export default function CurrencyConverter() {
  const [firstCurrencyInput, setFirstCurrencyInput] = useState(1);
  const [secondCurrencyInput, setSecondCurrencyInput] = useState(undefined);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const { response } = useExchangeRates();

  if (!response) return;

  return (
    <div className={styles['currency-converter']}>
      <div className={styles['currency-converter__currency-block-main']}>
        <div className={styles['currency-converter-input-container']}>
          <input
            className={styles['currency-converter-input']}
            type="number"
            value={firstCurrencyInput}
            onChange={(event) => setFirstCurrencyInput(event.target.value)}
          />
        </div>
        <div>
          <h2>UAH</h2>
        </div>
      </div>
      <div className={styles['currency-converter__currency-block-secondary']}>
        <div className={styles['currency-converter-input-container']}>
          <input
            className={styles['currency-converter-input']}
            type="number"
            value={secondCurrencyInput}
            onChange={(event) => setSecondCurrencyInput(event.target.value)}
          />
        </div>
        <div className={styles['currency-converter-input-container']}>
          <select
            className={clsx(
              styles['currency-converter-input'],
              styles['currency-converter-input--select']
            )}
            value={selectedCurrency}
            onChange={(event) => setSelectedCurrency(event.target.value)}
          >
            {response.map((currency) => {
              return (
                <option value={currency.cc} key={currency.cc}>
                  {currency.txt}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
