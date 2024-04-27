import { useMemo, useState } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

import Input from 'components/Input';
import Spinner from 'components/Spinner';
import Error from 'components/Error';
import CurrencyRateTableRow from './CurrencyRateTableRow';

import styles from './CurrencyRateTable.module.scss';

export default function CurrencyRateTable() {
  const [searchValue, setSearchSearch] = useState('');
  const { response, isLoading, error } = useExchangeRates();

  const filteredList = useMemo(() => {
    return response?.filter(currency =>
      currency.txt.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [response, searchValue]);

  if (isLoading) return <Spinner />;

  if (error) {
    const { name, message } = error;
    return (
      <div className={styles['table-wrapper']}>
        <Error title={name} message={message} />
      </div>
    );
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          data-testid="searchInput"
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
            {filteredList ? (
              filteredList.map(currency => {
                return (
                  <CurrencyRateTableRow
                    key={currency.txt}
                    name={currency.txt}
                    rate={currency.rate}
                  />
                );
              })
            ) : (
              <tr>
                <td className={styles['currency-is-not-found']}>Валюту не знайдено</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
