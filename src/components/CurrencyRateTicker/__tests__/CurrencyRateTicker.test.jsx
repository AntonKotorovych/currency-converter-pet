import { render, screen } from '@testing-library/react';
import { mockResponse } from 'mocks/exchangeRatesResponse';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import CurrencyRateTicker from '..';

jest.mock('store/ExchangeRatesProvider');

describe('CurrencyRateTicker', () => {
  const defaultRatesState = {
    response: null,
    isLoading: true,
    error: null
  };

  const setExchangeRates = (state = defaultRatesState) =>
    useExchangeRates.mockReturnValue(state);

  beforeEach(() => {
    jest.clearAllMocks();
    setExchangeRates();
  });

  const renderComponent = () => render(<CurrencyRateTicker />);

  describe('without loading', () => {
    test('renders the exchange rates list', () => {
      setExchangeRates({
        ...defaultRatesState,
        response: mockResponse,
        isLoading: false
      });

      renderComponent();

      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  describe('with loading', () => {
    test('renders spinner', () => {
      setExchangeRates();

      renderComponent();

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('with error', () => {
    test('renders error', () => {
      setExchangeRates({
        ...defaultRatesState,
        error: { name: 'Error 404', message: 'Not Found' }
      });

      renderComponent();

      screen.debug();

      const error = screen.getByRole('heading', { level: 3 });

      expect(error).toBeInTheDocument();

      expect(error).toHaveTextContent('Сталася помилка: Error 404. Not Found');
    });
  });
});
