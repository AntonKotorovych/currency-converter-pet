import styles from './Currency.module.scss';
import PropTypes from 'prop-types';

Currency.propTypes = {
  title: PropTypes.string,
  rate: PropTypes.number
};

export default function Currency({ title, rate }) {
  return (
    <li className={styles['list-item']}>
      {title} - {rate} ₴
    </li>
  );
}
