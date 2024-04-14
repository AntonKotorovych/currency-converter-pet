import { renderHook, act } from '@testing-library/react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import { useCurrencyState } from 'hooks/useCurrencyState';
import { mockResponse } from 'mocks/exchangeRatesResponse';

jest.mock('store/ExchangeRatesProvider');

describe('useCurrencyState()', () => {
  const defaultRatesState = {
    response: mockResponse,
    isLoading: false,
    error: null
  };

  const setExchangeRates = (state = defaultRatesState) =>
    useExchangeRates.mockReturnValue(state);

  const customRenderHook = () => renderHook(() => useCurrencyState());

  beforeEach(() => {
    jest.clearAllMocks();
    setExchangeRates();
  });

  test('returns default currency state', () => {
    setExchangeRates({
      ...defaultRatesState,
      response: null
    });

    const { result } = customRenderHook();

    expect(result.current.currencyState).toEqual({
      firstCurrencyInput: '',
      secondCurrencyInput: 1,
      selectedCurrency: null
    });
  });
});
