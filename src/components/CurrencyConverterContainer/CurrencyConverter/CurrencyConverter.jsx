import clsx from 'clsx';
import { useState } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

import styles from './CurrencyConverter.module.scss';

export default function CurrencyConverter() {
  const [firstCurrency, setFirstCurrency] = useState(1);
  const [secondCurrency, setSecondCurrency] = useState(undefined);

  const { response } = useExchangeRates();

  if (!response) return;

  console.log(response);

  return (
    <div className={styles['currency-converter']}>
      <div className={styles['currency-converter__currency-block-main']}>
        <div className={styles['currency-converter-input-container']}>
          <input
            className={styles['currency-converter-input']}
            type="number"
            value={firstCurrency}
            onChange={(event) => setFirstCurrency(event.target.value)}
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
            value={secondCurrency}
            onChange={(event) => setSecondCurrency(event.target.value)}
          />
        </div>
        <div className={styles['currency-converter-input-container']}>
          <select
            className={clsx(
              styles['currency-converter-input'],
              styles['currency-converter-input--select']
            )}
          >
            {response.map((currency) => {
              return (
                <option
                  value={currency.cc}
                  key={currency.cc}
                  selected={currency.cc === 'USD'}
                >
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
