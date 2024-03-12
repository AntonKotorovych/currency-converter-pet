import { memo } from 'react';
import { useMemo } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import Select from 'components/Select';

function CurrencySelect({ onChange, value }) {
  const { response } = useExchangeRates();
  const normalizedOptions = useMemo(() => {
    return response?.map(currency => ({
      value: currency.cc,
      label: currency.txt
    }));
  }, [response]);

  return (
    <Select options={normalizedOptions} value={value} onChange={onChange} />
  );
}

export default memo(CurrencySelect);
