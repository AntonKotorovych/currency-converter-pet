import { createContext, useContext, useEffect, useState } from 'react';
import { NBU_CURRENCY_EXCHANGE_API } from '../constants';

const ExchangeRatesContext = createContext(null);

export const useExchangeRates = () => useContext(ExchangeRatesContext);

export function ExchangeRatesProvider({ children }) {
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    const fetchExchangeRatesData = async () => {
      try {
        const response = await fetch(NBU_CURRENCY_EXCHANGE_API);
        const data = await response.json();
        setExchangeRates(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExchangeRatesData();
  }, []);

  return (
    <ExchangeRatesContext.Provider value={exchangeRates}>
      {children}
    </ExchangeRatesContext.Provider>
  );
}
