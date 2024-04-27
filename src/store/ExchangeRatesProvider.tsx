import { createContext, useContext, useEffect, useState } from 'react';

import { Currency } from 'types/interfaces/currency';

const NBU_API = import.meta.env.VITE_NBU_CURRENCY_EXCHANGE_API;
const DEFAULT_EXCHANGE_RATES = {
  response: null,
  isLoading: true,
  error: null
};

export interface ExchangeRates {
  response: Currency[] | null;
  isLoading: boolean;
  error: Error | null;
}

const ExchangeRatesContext = createContext<ExchangeRates>(DEFAULT_EXCHANGE_RATES);

export const useExchangeRates = () => useContext(ExchangeRatesContext);

export function ExchangeRatesProvider({ children }: React.PropsWithChildren) {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(DEFAULT_EXCHANGE_RATES);

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
        if (error instanceof Error) {
          setExchangeRates({
            response: null,
            isLoading: false,
            error
          });
        }
      }
    })();
  }, []);

  return (
    <ExchangeRatesContext.Provider value={exchangeRates}>{children}</ExchangeRatesContext.Provider>
  );
}
