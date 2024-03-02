import CurrencyRateTable from 'components/CurrencyConverterContainer/CurrencyRateTable';
import CurrencyConverter from 'components/CurrencyConverterContainer/CurrencyConverter';

import styles from './CurrencyConverterContainer.module.scss';

export default function CurrencyConverterContainer() {
  return (
    <div className={styles['currency-converter-container']}>
      <CurrencyConverter />
      <CurrencyRateTable />
    </div>
  );
}
