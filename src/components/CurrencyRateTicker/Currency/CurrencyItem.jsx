import PropTypes from 'prop-types';
import styles from './CurrencyItem.module.scss';

CurrencyItem.propTypes = {
  title: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired
};

export default function CurrencyItem({ title, rate }) {
  return (
    <li className={styles['list-item']}>
      {title} - {rate} ₴
    </li>
  );
}
