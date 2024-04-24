import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { Currency } from 'types/interfaces/index';

const NBU_API = import.meta.env.VITE_NBU_CURRENCY_EXCHANGE_API;

interface ExchangeRates {
  response: Currency[] | null;
  isLoading: boolean;
  error: { name: string; message: string } | null | unknown;
}

const ExchangeRatesContext = createContext<ExchangeRates | null>(null);

export const useExchangeRates = () =>
  useContext(ExchangeRatesContext) as ExchangeRates;

export function ExchangeRatesProvider({ children }: { children: ReactNode }) {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({
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
