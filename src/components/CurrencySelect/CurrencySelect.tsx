import { memo, useMemo, useCallback } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import Select from 'components/Select';
import { Currency } from 'types/interfaces/currency';

export interface Props {
  value?: string;
  onChange: (newSelectedCurrency: Currency) => void;
}

function CurrencySelect({ value, onChange }: Props) {
  const exchangeRates = useExchangeRates();

  const handleSelectCurrency = useCallback(
    (value: string) => {
      if (exchangeRates.response) {
        const newSelectedCurrency = exchangeRates.response.find(currency => currency.cc === value);

        if (newSelectedCurrency) onChange(newSelectedCurrency);
      }
    },
    [exchangeRates.response, onChange]
  );

  const normalizedOptions = useMemo(() => {
    return exchangeRates.response?.map(currency => ({
      value: currency.cc,
      label: currency.txt
    }));
  }, [exchangeRates.response]);

  return <Select options={normalizedOptions} value={value} onChange={handleSelectCurrency} />;
}

export default memo(CurrencySelect);
