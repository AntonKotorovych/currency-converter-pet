import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { mockResponse } from 'mocks/exchangeRatesResponse';
import { useCurrencyState } from 'hooks/useCurrencyState';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import CurrencyConverter from '..';

jest.mock('hooks/useCurrencyState');
jest.mock('store/ExchangeRatesProvider');

describe('CurrencyConverter', () => {
  const onChangeInput = jest.fn();

  const defaultCurrencyState = {
    currencyState: {
      firstCurrencyInput: 38.9945,
      secondCurrencyInput: 1,
      selectedCurrency: mockResponse.find(currency => currency.cc === 'USD')
    },
    onChangeInput,
    onSelectCurrency: jest.fn()
  };

  const defaultRatesState = {
    response: null,
    isLoading: true,
    error: null
  };

  const setExchangeRates = (state = defaultRatesState) => {
    useExchangeRates.mockReturnValue({ ...state });
  };

  const setCurrencyState = (state = defaultCurrencyState) => {
    useCurrencyState.mockReturnValue({ ...state });
  };

  const renderComponent = () => render(<CurrencyConverter />);

  beforeEach(() => {
    jest.clearAllMocks();
    setExchangeRates();
    setCurrencyState();
  });

  describe('without loading', () => {
    test('renders component correctly', () => {
      setExchangeRates({
        response: mockResponse,
        isLoading: false,
        error: null
      });

      renderComponent();

      expect(screen.getByTestId('firstInput')).toBeInTheDocument();
      expect(screen.getByTestId('secondInput')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    describe('when user types values', () => {
      test('calls onChange() with correct values', async () => {
        setExchangeRates({
          response: mockResponse,
          isLoading: false,
          error: null
        });

        renderComponent();

        await user.type(screen.getByTestId('firstInput'), '5');

        expect(onChangeInput).toHaveBeenCalledWith({
          name: 'firstInput',
          value: '38.99455'
        });
      });
    });
  });

  describe('with loading', () => {
    test('render spinner', () => {
      setExchangeRates();

      renderComponent();

      expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
    });
  });
});
