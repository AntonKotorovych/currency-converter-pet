import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import CurrencyConverter from '..';

const mockOnChangeInput = jest.fn();
let mockIsLoading = true;

jest.mock('hooks/useCurrencyState', () => ({
  useCurrencyState: () => ({
    currencyState: {
      firstCurrencyInput: 50,
      secondCurrencyInput: 1,
      selectedCurrency: {
        r030: 840,
        txt: 'Долар США',
        rate: 38.9882,
        cc: 'USD',
        exchangedate: '09.04.2024'
      }
    },
    onChangeInput: mockOnChangeInput,
    onSelectCurrency: jest.fn()
  })
}));

jest.mock('store/ExchangeRatesProvider', () => ({
  useExchangeRates: jest.fn(() => ({ isLoading: mockIsLoading }))
}));

describe('CurrencyConverter', () => {
  const renderComponent = () => render(<CurrencyConverter />);

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('render component correctly', () => {
    mockIsLoading = false;

    renderComponent();

    expect(screen.getByTestId('firstInput')).toBeInTheDocument();
    expect(screen.getByTestId('secondInput')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('render loadingSpinner when isLoading', () => {
    mockIsLoading = true;

    renderComponent();

    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });

  describe('when user types values', () => {
    test('calling onChange with correct values', async () => {
      mockIsLoading = false;

      renderComponent();

      const input = screen.getByTestId('firstInput');

      await user.type(input, '5');

      expect(mockOnChangeInput).toHaveBeenCalledWith({
        name: 'firstInput',
        value: '505'
      });
    });
  });
});
