import styles from './CurrencyItem.module.scss';

export interface Props {
  title: string;
  rate: number;
}

export default function CurrencyItem({ title, rate }: Props) {
  return (
    <li className={styles['list-item']}>
      {title} - {rate} ₴
    </li>
  );
}
