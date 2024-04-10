import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import CurrencyRateTable from '..';

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

describe('CurrencyRateTable', () => {
  const renderComponent = () => render(<CurrencyRateTable />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('component renders correctly', () => {
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

    mockIsLoading = false;

    renderComponent();

    expect(screen.getByTestId('searchInput')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
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
      mockIsLoading = false;

      renderComponent();

      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });
  });

  describe('user types value into search input', () => {
    test('value in input field changes', async () => {
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
      mockError = null;
      mockIsLoading = false;

      renderComponent();

      const searchInput = screen.getByTestId('searchInput');

      await user.type(searchInput, 'USD');

      expect(searchInput.value).toBe('USD');
    });
  });
});
