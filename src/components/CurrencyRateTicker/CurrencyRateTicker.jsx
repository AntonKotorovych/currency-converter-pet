import styles from './CurrencyRateTicker.module.scss';
import { useExchangeRates } from '../../store/ExchangeRatesContext';

import Currency from './Currency';
import LoadingSpinner from '../LoadingSpinner';

export default function CurrencyRateTicker() {
  const exchangeRates = useExchangeRates();

  if (!exchangeRates) {
    return (
      <div
        className={`${styles['currency-rate-container']} ${styles['currency-rate-container--spinner']}`}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles['currency-rate-container']}>
      <ul className={styles['currency-rate-list']}>
        {exchangeRates.map((currency) => (
          <Currency
            key={currency.cc}
            title={currency.txt}
            rate={currency.rate}
          />
        ))}
      </ul>
    </div>
  );
}
