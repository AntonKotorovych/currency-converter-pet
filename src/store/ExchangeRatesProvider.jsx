import { createContext, useContext, useEffect, useState } from 'react';

const NBU_API = import.meta.env.VITE_NBU_CURRENCY_EXCHANGE_API;

const ExchangeRatesContext = createContext(null);

export const useExchangeRates = () => useContext(ExchangeRatesContext);

export function ExchangeRatesProvider({ children }) {
  const [exchangeRates, setExchangeRates] = useState({
    response: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(NBU_API);
        const data = await response.json();
        setExchangeRates({
          response: data,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setExchangeRates({
          response: null,
          isLoading: false,
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
