import styles from './MainTitle.module.scss';

export default function MainTitle() {
  const date = new Intl.DateTimeFormat('uk-UA').format(new Date());

  return (
    <div className={styles['main-title-container']}>
      <h1>Актуальні Курси Валют станом на {date}</h1>
    </div>
  );
}
