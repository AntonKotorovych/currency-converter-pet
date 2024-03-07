import { useMemo, useState, memo } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

import Input from 'components/Input';
import CurrencyRateTableRow from './CurrencyRateTableRow';

import styles from './CurrencyRateTable.module.scss';

function CurrencyRateTable() {
  const [searchValue, setSearchSearch] = useState('');
  const { response: currencyList } = useExchangeRates();

  const filteredList = useMemo(() => {
    return currencyList.filter((currency) =>
      currency.txt.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [currencyList, searchValue]);

  const handleSearchChange = (event) => {
    setSearchSearch(event.target.value);
  };

  return (
    <div className={styles['table-wrapper']}>
      <div className={styles['currency-search']}>
        <Input
          type="text"
          name="search"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Пошук Валюти..."
        />
      </div>
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

export default memo(CurrencyRateTable);
