import styles from './styles/App.module.scss';
import { useEffect, useState } from 'react';

import Header from './Header/Header';

const MAIN_TITLE = 'Hello World';

export default function App() {
  const [counter, setCounter] = useState(0);

  // Just checking if it works for the first time creating react app
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(counter + 1);
    }, 420);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className={styles.backgroundColor}>
      <Header title={MAIN_TITLE} counter={counter} />
    </div>
  );
}
