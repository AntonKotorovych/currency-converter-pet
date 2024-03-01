import clsx from 'clsx';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

import Spinner from 'components/Spinner';
import Error from 'components/Error';
import CurrencyItem from './Currency';

import styles from './CurrencyRateTicker.module.scss';

export default function CurrencyRateTicker() {
  const { response, isLoading, error } = useExchangeRates();
  const classNames = clsx(
    styles['currency-rate-container'],
    styles['currency-rate-container--status']
  );

  if (error)
    return (
      <div className={classNames}>
        <Error title={error.name} message={error.message} />
      </div>
    );

  if (!response && isLoading)
    return (
      <div className={classNames}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles['currency-rate-container']}>
      <ul className={styles['currency-rate-list']}>
        {response.map((currency) => (
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
