import styles from './CurrencyRateTable.module.scss';

interface Props {
  name: string;
  rate: number;
}

export default function CurrencyRateTableRow({ name, rate }: Props) {
  return (
    <tr className={styles['currency-rate-table__row']}>
      <td>{name}</td>
      <td>{rate}</td>
    </tr>
  );
}
