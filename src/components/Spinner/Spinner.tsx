import styles from './Spinner.module.scss';

export default function Spinner() {
  return <div className={styles['loading-spinner']} data-testid="spinner" />;
}