import styles from './MainTitle.module.scss';

export default function MainTitle() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  return (
    <div className={styles['main-title-container']}>
      <h1>Актуальні Курси Валют станом на {`${day}.${month}.${year}`}</h1>
    </div>
  );
}
