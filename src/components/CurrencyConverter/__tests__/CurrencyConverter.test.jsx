import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import CurrencyConverter from '..';

jest.mock('store/ExchangeRatesProvider', () => ({
  useExchangeRates: jest.fn()
}));

const onChangeInputMock = jest.fn();

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
    onChangeInput: onChangeInputMock,
    onSelectCurrency: jest.fn()
  })
}));

describe('CurrencyConverter', () => {
  const renderComponent = () => render(<CurrencyConverter />);

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('render component correctly', () => {
    jest
      .spyOn(require('store/ExchangeRatesProvider'), 'useExchangeRates')
      .mockReturnValue({
        isLoading: false
      });

    renderComponent();

    expect(screen.getByTestId('firstInput')).toBeInTheDocument();
    expect(screen.getByTestId('secondInput')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('not render component when isLoading = true and show spinner', () => {
    jest
      .spyOn(require('store/ExchangeRatesProvider'), 'useExchangeRates')
      .mockReturnValue({
        isLoading: true
      });

    renderComponent();

    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });

  describe('when user types values', () => {
    test('calls handleInputChange', async () => {
      jest
        .spyOn(require('store/ExchangeRatesProvider'), 'useExchangeRates')
        .mockReturnValue({
          isLoading: false
        });

      renderComponent();

      const input = screen.getByTestId('firstInput');

      await user.type(input, '5');

      expect(onChangeInputMock).toHaveBeenCalledWith({
        name: 'firstInput',
        value: '5'
      }); // я не розумію як реалізувати логіку тут
    });
  });
});
