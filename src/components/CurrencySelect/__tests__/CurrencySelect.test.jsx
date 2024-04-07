import { render, screen } from '@testing-library/react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import CurrencySelect from '..';

jest.mock('store/ExchangeRatesProvider', () => ({
  useExchangeRates: jest.fn(() => ({
    response: []
  }))
}));

describe('CurrencySelect', () => {
  test('renders component correctly', () => {
    const mockResponse = [
      { cc: 'EUR', txt: 'Євро' },
      { cc: 'USD', txt: 'Американский доллар' }
    ];

    useExchangeRates.mockReturnValueOnce({ response: mockResponse });

    const onChange = jest.fn();

    render(<CurrencySelect value="USD" onChange={onChange} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });
});
