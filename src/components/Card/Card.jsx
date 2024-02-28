import styles from './Card.module.scss';

export default function Card({ children }) {
  return <div className={styles['card-wrapper']}>{children}</div>;
}
