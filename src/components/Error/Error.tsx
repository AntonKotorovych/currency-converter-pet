import styles from './Error.module.scss';

export interface Props {
  title: string;
  message: string;
}

export default function Error({ title, message }: Props) {
  return (
    <div className={styles['error']}>
      <h3>
        Сталася помилка: {title}. {message}
      </h3>
    </div>
  );
}
