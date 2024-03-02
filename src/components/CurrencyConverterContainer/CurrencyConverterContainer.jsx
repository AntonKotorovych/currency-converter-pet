import CurrencyRateTable from 'components/CurrencyConverterContainer/CurrencyRateTable';
import styles from './CurrencyConverterContainer.module.scss';

export default function CurrencyConverterContainer() {
  return (
    <div className={styles['currency-converter-container']}>
      <CurrencyRateTable />
    </div>
  );
}
