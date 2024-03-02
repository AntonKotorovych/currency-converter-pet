import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';

import styles from './CurrencyConverter.module.scss';

export default function CurrencyConverter() {
  const [firstCurrencyInput, setFirstCurrencyInput] = useState(1000);
  const [secondCurrencyInput, setSecondCurrencyInput] = useState(0);
  const [firstInputIsActive, setFirstInputIsActive] = useState(true);
  const [secondInputIsActive, setSecondInputIsActive] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState(undefined);

  const firstInputField = useRef(null);
  const secondInputField = useRef(null);

  const { response } = useExchangeRates();

  const clearInputs = () => {
    setFirstCurrencyInput('');
    setSecondCurrencyInput('');
  };

  useEffect(() => {
    if (response && firstInputIsActive && firstInputField.current) {
      firstInputField.current.focus();
    }
  }, [response, firstInputIsActive]);

  useEffect(() => {
    if (response && !selectedCurrency) {
      setSelectedCurrency(response.find((currency) => currency.cc === 'USD'));
    }
  }, [response, selectedCurrency]);

  useEffect(() => {
    if (selectedCurrency && firstCurrencyInput && firstInputIsActive) {
      const rate = selectedCurrency.rate;
      firstCurrencyInput / rate;
      setSecondCurrencyInput(parseFloat(firstCurrencyInput / rate).toFixed(2));
    }
  }, [selectedCurrency, firstCurrencyInput, firstInputIsActive]);

  useEffect(() => {
    if (selectedCurrency && secondCurrencyInput && secondInputIsActive) {
      const rate = selectedCurrency.rate;
      setFirstCurrencyInput(parseFloat(secondCurrencyInput * rate).toFixed(2));
    }
  }, [selectedCurrency, secondCurrencyInput, secondInputIsActive]);

  if (!response) return;

  return (
    <div className={styles['currency-converter']}>
      <div className={styles['currency-converter__currency-block-main']}>
        <div className={styles['currency-converter-input-container']}>
          <input
            className={styles['currency-converter-input']}
            type="number"
            step="0.01"
            ref={firstInputField}
            value={firstCurrencyInput}
            onChange={(event) => {
              if (event.target.value === '') {
                clearInputs();
              } else {
                setFirstCurrencyInput(event.target.value);
              }
            }}
            onFocus={() => {
              setFirstInputIsActive(true);
              setSecondInputIsActive(false);
            }}
          />
        </div>
        <div>
          <h2>UAH</h2>
        </div>
      </div>
      <div className={styles['currency-converter__currency-block-secondary']}>
        <div className={styles['currency-converter-input-container']}>
          <input
            className={styles['currency-converter-input']}
            type="number"
            step="0.01"
            ref={secondInputField}
            value={secondCurrencyInput}
            onChange={(event) => {
              if (event.target.value === '') {
                clearInputs();
              } else {
                setSecondCurrencyInput(event.target.value);
              }
            }}
            onFocus={() => {
              setSecondInputIsActive(true);
              setFirstInputIsActive(false);
            }}
          />
        </div>
        <div className={styles['currency-converter-input-container']}>
          <select
            className={clsx(
              styles['currency-converter-input'],
              styles['currency-converter-input--select']
            )}
            value={selectedCurrency && selectedCurrency.cc}
            onChange={(event) =>
              setSelectedCurrency(
                response.find((currency) => currency.cc === event.target.value)
              )
            }
          >
            {response.map((currency) => {
              return (
                <option value={currency.cc} key={currency.cc}>
                  {currency.txt}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
