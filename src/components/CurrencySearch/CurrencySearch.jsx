import Input from 'components/Input';

import styles from './CurrencySearch.module.scss';

export default function CurrencySearch() {
  return (
    <div className={styles['currency-search']}>
      <h3>Пошук Валюти:</h3>
      <Input type="text" />
    </div>
  );
}
