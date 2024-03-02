import { useExchangeRates } from 'store/ExchangeRatesProvider';

import CurrencyRateTableRow from './CurrencyRateTableRow';
import styles from './CurrencyRateTable.module.scss';

export default function CurrencyRateTable() {
  const { response } = useExchangeRates();

  console.log(response);
  return (
    <div className={styles['currency-rate-table-container']}>
      <table className={styles['currency-rate-table']}>
        <thead>
          <tr className={styles['currency-rate-table__head']}>
            <th>Валюта</th>
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          {!response
            ? null
            : response.map((currency) => {
                return (
                  <CurrencyRateTableRow
                    key={currency.txt}
                    name={currency.txt}
                    rate={currency.rate}
                  />
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
