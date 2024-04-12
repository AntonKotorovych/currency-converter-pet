import PropTypes from 'prop-types';
import styles from './Error.module.scss';

Error.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default function Error({ title, message }) {
  return (
    <div className={styles['error']}>
      <h3>
        Сталася помилка: {title}. {message}
      </h3>
    </div>
  );
}
