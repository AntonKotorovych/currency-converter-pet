import styles from './Error.module.scss';

export default function Error({ title, message }) {
  return (
    <div className={styles['error']}>
      <h3>
        Сталася помилка: {title}. {message}
      </h3>
    </div>
  );
}
