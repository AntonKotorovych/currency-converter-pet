import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import CurrencySelect from '..';

jest.mock('store/ExchangeRatesProvider', () => ({
  useExchangeRates: jest.fn(() => ({
    response: []
  }))
}));

describe('CurrencySelect', () => {
  const mockResponse = [
    { cc: 'EUR', txt: 'Євро' },
    { cc: 'USD', txt: 'Американский доллар' }
  ];

  const onChange = jest.fn();

  const renderComponent = () =>
    render(<CurrencySelect value="USD" onChange={onChange} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders component correctly', () => {
    renderComponent();

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  describe('onChange', () => {
    test('calls onChange with selected currency when response exists', async () => {
      useExchangeRates.mockReturnValueOnce({ response: mockResponse });

      renderComponent();

      await user.selectOptions(screen.getByRole('combobox'), 'EUR');

      expect(onChange).toHaveBeenCalledWith({ cc: 'EUR', txt: 'Євро' });
    });

    test('does not call onChange when response is empty', async () => {
      useExchangeRates.mockReturnValueOnce({ response: null });

      renderComponent();

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
