import PropTypes from 'prop-types';
import { memo, useMemo, useCallback } from 'react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import Select from 'components/Select';

CurrencySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

function CurrencySelect({ value, onChange }) {
  const { response } = useExchangeRates();

  const handleSelectCurrency = useCallback(
    value => {
      if (response) {
        const newSelectedCurrency = response.find(
          currency => currency.cc === value
        );
        if (newSelectedCurrency) {
          onChange(newSelectedCurrency);
        }
      }
    },
    [response, onChange]
  );

  const normalizedOptions = useMemo(() => {
    return response?.map(currency => ({
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
