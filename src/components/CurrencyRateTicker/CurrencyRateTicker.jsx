import styles from './CurrencyRateTicker.module.scss';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

import CurrencyItem from './Currency';
import Spinner from 'components/Spinner';
import Error from 'components/Error';
import clsx from 'clsx';

export default function CurrencyRateTicker() {
  const exchangeRates = useExchangeRates();
  const classNames = clsx(
    styles['currency-rate-container'],
    styles['currency-rate-container--spinner']
  );

  if (!exchangeRates.response) {
    return (
      <div className={classNames}>
        {!exchangeRates.error ? (
          <Spinner />
        ) : (
          <Error
            title={exchangeRates.error.name}
            message={exchangeRates.error.message}
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles['currency-rate-container']}>
      <ul className={styles['currency-rate-list']}>
        {exchangeRates.response.map((currency) => (
          <CurrencyItem
            key={currency.cc}
            title={currency.txt}
            rate={currency.rate}
          />
        ))}
      </ul>
    </div>
  );
}
