import { createContext, useContext, useEffect, useState } from 'react';
import { NBU_CURRENCY_EXCHANGE_API } from 'constants';

const ExchangeRatesContext = createContext(null);

export const useExchangeRates = () => useContext(ExchangeRatesContext);

export function ExchangeRatesProvider({ children }) {
  const [exchangeRates, setExchangeRates] = useState({
    response: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(NBU_CURRENCY_EXCHANGE_API);
        const data = await response.json();
        setExchangeRates({
          response: data,
          loading: false,
          error: null
        });
      } catch (error) {
        setExchangeRates({
          response: null,
          loading: false,
          error
        });
      }
    })();
  }, []);

  return (
    <ExchangeRatesContext.Provider value={exchangeRates}>
      {children}
    </ExchangeRatesContext.Provider>
  );
}
