import { render, screen } from '@testing-library/react';
import CurrencyRateTicker from '..';

let mockResponse = null;
let mockIsLoading = true;
let mockError = null;

jest.mock('store/ExchangeRatesProvider', () => ({
  useExchangeRates: jest.fn(() => ({
    response: mockResponse,
    isLoading: mockIsLoading,
    error: mockError
  }))
}));

describe('CurrencyRateTicker', () => {
  const renderComponent = () => render(<CurrencyRateTicker />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('render component correctly', () => {
    test('when response fetched', () => {
      mockResponse = [
        {
          r030: 36,
          txt: 'Австралійський долар',
          rate: 25.8124,
          cc: 'AUD',
          exchangedate: '10.04.2024'
        },
        {
          r030: 124,
          txt: 'Канадський долар',
          rate: 28.721,
          cc: 'CAD',
          exchangedate: '10.04.2024'
        }
      ];

      renderComponent();

      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  describe('render spinner', () => {
    test('when isLoading', () => {
      mockResponse = null;
      mockIsLoading = true;

      renderComponent();

      expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
    });
  });

  describe('render error', () => {
    test('when error occured', () => {
      mockError = 'Error 404';
      mockResponse = null;

      renderComponent();

      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });
  });
});
