import styles from './CurrencyRateTable.module.scss';

export default function CurrencyRateTableRow({ name, rate }) {
  return (
    <tr className={styles['currency-rate-table__row']}>
      <td>{name}</td>
      <td>{rate}</td>
    </tr>
  );
}
