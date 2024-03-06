import { useState } from 'react';
import CurrencySearch from 'components/CurrencySearch';
import CurrencyRateTableRow from './CurrencyRateTableRow';

import styles from './CurrencyRateTable.module.scss';

export default function CurrencyRateTable({ currencyList }) {
  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState(currencyList);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setFilteredList(
      currencyList.filter((currency) =>
        currency.txt.toLowerCase().startsWith(newQuery.toLowerCase())
      )
    );
  };

  return (
    <div className={styles['table-wrapper']}>
      <CurrencySearch onQueryChange={handleQueryChange} queryValue={query} />
      <div className={styles['currency-rate-table-container']}>
        <table className={styles['currency-rate-table']}>
          <thead className={styles.thead}>
            <tr className={styles['currency-rate-table__head']}>
              <th>Валюта</th>
              <th>Курс</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((currency) => {
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
    </div>
  );
}
