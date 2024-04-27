import { render, screen } from '@testing-library/react';
import { mockResponse } from 'mocks/exchangeRatesResponse';
import { ExchangeRates, useExchangeRates } from 'store/ExchangeRatesProvider';
import CurrencyRateTicker from '..';

jest.mock('store/ExchangeRatesProvider');

describe('CurrencyRateTicker', () => {
  const defaultRatesState: ExchangeRates = {
    response: mockResponse,
    isLoading: false,
    error: null
  };

  const setExchangeRates = (state = defaultRatesState) =>
    (useExchangeRates as jest.Mock).mockReturnValue(state);

  beforeEach(() => {
    jest.clearAllMocks();
    setExchangeRates();
  });

  const renderComponent = () => render(<CurrencyRateTicker />);

  describe('without loading', () => {
    test('renders the exchange rates list', () => {
      setExchangeRates();

      renderComponent();

      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  describe('with loading', () => {
    test('renders spinner', () => {
      setExchangeRates({
        ...defaultRatesState,
        response: null,
        isLoading: true
      });

      renderComponent();

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('with error', () => {
    test('renders error', () => {
      setExchangeRates({
        response: null,
        isLoading: false,
        error: { name: 'Error 404', message: 'Not Found' }
      });

      renderComponent();

      const error = screen.getByRole('heading', { level: 3 });

      expect(error).toBeInTheDocument();

      expect(error).toHaveTextContent('Сталася помилка: Error 404. Not Found');
    });
  });
});
