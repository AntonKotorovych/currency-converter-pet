import { memo, useMemo, useCallback } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import Select from 'components/Select';
import { Currency } from 'types/interfaces';

export interface Props {
  value?: string;
  onChange: (newSelectedCurrency: Currency) => void;
}

function CurrencySelect({ value, onChange }: Props) {
  const { response }: { response: Currency[] | null } = useExchangeRates();

  const handleSelectCurrency = useCallback(
    (value: string) => {
      if (response) {
        const newSelectedCurrency = response.find(
          (currency: Currency) => currency.cc === value
        );
        if (newSelectedCurrency) onChange(newSelectedCurrency);
      }
    },
    [response, onChange]
  );

  const normalizedOptions = useMemo(() => {
    return response?.map((currency: Currency) => ({
      value: currency.cc,
      label: currency.txt
    }));
  }, [response]);

  return (
    <Select
      options={normalizedOptions}
      value={value}
      onChange={handleSelectCurrency}
    />
  );
}

export default memo(CurrencySelect);
