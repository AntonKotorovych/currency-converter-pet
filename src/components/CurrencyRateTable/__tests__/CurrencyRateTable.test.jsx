import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import { mockResponse } from 'mocks/exchangeRatesResponse';
import CurrencyRateTable from '..';

jest.mock('store/ExchangeRatesProvider');

describe('CurrencyRateTable', () => {
  const defaultRatesState = {
    response: null,
    isLoading: true,
    error: null
  };

  const setExchangeRates = (state = defaultRatesState) =>
    useExchangeRates.mockReturnValue({ ...state });

  beforeEach(() => {
    jest.clearAllMocks();
    setExchangeRates();
  });

  const renderComponent = () => render(<CurrencyRateTable />);

  describe('without loading', () => {
    test('renders component correctly', () => {
      setExchangeRates({
        response: mockResponse,
        isLoading: false,
        error: null
      });

      renderComponent();

      expect(screen.getByTestId('searchInput')).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('with loading', () => {
    test('renders spinner', () => {
      setExchangeRates({
        response: null,
        isLoading: true,
        error: null
      });

      renderComponent();

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('with error', () => {
    test('renders error text', () => {
      setExchangeRates({
        response: null,
        isLoading: false,
        error: { name: 'Error 404', message: 'Not Found' }
      });

      renderComponent();

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Сталася помилка: Error 404. Not Found'
      );
    });
  });

  describe('when user types value into the search input', () => {
    test('changes the value in input field', async () => {
      setExchangeRates({
        response: mockResponse,
        isLoading: false,
        error: null
      });

      renderComponent();

      const searchInput = screen.getByTestId('searchInput');

      await user.type(searchInput, 'USD');

      expect(searchInput.value).toBe('USD');
    });

    test('filters list', async () => {
      setExchangeRates({
        response: mockResponse,
        isLoading: false,
        error: null
      });

      renderComponent();

      const searchInput = screen.getByTestId('searchInput');

      await user.type(searchInput, 'Долар');

      const filteredList = screen.getByRole('textbox');

      expect(searchInput.value).toBe('Долар');

      expect(filteredList).toBeInTheDocument();

      expect(screen.getByText('Долар США')).toBeInTheDocument();
      expect(screen.queryByText('Євро')).not.toBeInTheDocument();
      expect(screen.queryByText('Японська Єна')).not.toBeInTheDocument();
    });
  });
});
