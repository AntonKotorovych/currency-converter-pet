import CurrencyRateTableRow from './CurrencyRateTableRow';
import styles from './CurrencyRateTable.module.scss';

export default function CurrencyRateTable({ currencyList }) {
  return (
    <div className={styles['currency-rate-table-container']}>
      <table className={styles['currency-rate-table']}>
        <thead className={styles.thead}>
          <tr className={styles['currency-rate-table__head']}>
            <th>Валюта</th>
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          {currencyList.map((currency) => {
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
