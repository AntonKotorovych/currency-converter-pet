import MainTitle from 'components/MainTitle';
import CurrencyRateTicker from 'components/CurrencyRateTicker';
import CurrencyConverter from 'components/CurrencyConverter';
import CurrencyRateTable from 'components/CurrencyRateTable';

import styles from './HomePage.module.scss';

export default function HomePage() {
  return (
    <>
      <MainTitle />
      <CurrencyRateTicker />
      <div className={styles['main-interface']}>
        <CurrencyConverter />
        <CurrencyRateTable />
      </div>
    </>
  );
}
