import { renderHook, act } from '@testing-library/react';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import { useCurrencyState } from 'hooks/useCurrencyState';
import { mockResponse } from 'mocks/exchangeRatesResponse';

jest.mock('store/ExchangeRatesProvider');

describe('useCurrencyState()', () => {
  jest.spyOn(Storage.prototype, 'setItem');
  jest.spyOn(Storage.prototype, 'getItem');
  jest.spyOn(Storage.prototype, 'clear');

  afterAll(() => {
    jest.clearAllMocks();
  });

  const defaultRatesState = {
    response: mockResponse,
    isLoading: false,
    error: null
  };

  const defaultDownloadedState = {
    firstCurrencyInput: 38.99,
    secondCurrencyInput: 1,
    selectedCurrency: {
      r030: 840,
      txt: 'Долар США',
      rate: 38.9945,
      cc: 'USD',
      exchangedate: '10.04.2024'
    }
  };

  const setExchangeRates = (state = defaultRatesState) =>
    useExchangeRates.mockReturnValue(state);

  const customRenderHook = () => renderHook(() => useCurrencyState());

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
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

  describe('when initial render', () => {
    test('calls localStorage.getItem()', () => {
      customRenderHook();

      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenCalledWith('currencyState');
    });
  });

  describe('when currencyState changes', () => {
    test('calls localStorage.setItem()', () => {
      const { result } = customRenderHook();

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.onChangeInput({ value: 100, name: 'firstInput' });
      });

      expect(localStorage.setItem).toHaveBeenCalledTimes(2);

      act(() => {
        result.current.onChangeInput({ value: 100, name: 'secondInput' });
      });

      expect(localStorage.setItem).toHaveBeenCalledTimes(3);

      act(() => {
        result.current.onSelectCurrency({
          r030: 818,
          txt: 'Єгипетський фунт',
          rate: 0.8201,
          cc: 'EGP',
          exchangedate: '10.04.2024'
        });
      });

      expect(localStorage.setItem).toHaveBeenCalledTimes(4);
    });
  });

  describe('when error', () => {
    test('calls localStorage.clear()', () => {
      setExchangeRates({
        ...defaultRatesState,
        response: null,
        error: !null
      });

      customRenderHook();

      expect(localStorage.clear).toHaveBeenCalled();
    });
  });

  describe('when response downloads', () => {
    test('updates currency state with default values', async () => {
      setExchangeRates({
        ...defaultRatesState,
        response: null
      });

      const { result, rerender } = customRenderHook();

      expect(result.current.currencyState).toEqual({
        firstCurrencyInput: '',
        secondCurrencyInput: 1,
        selectedCurrency: null
      });

      setExchangeRates();

      rerender();

      expect(result.current.currencyState).toEqual({
        firstCurrencyInput: 38.99,
        secondCurrencyInput: 1,
        selectedCurrency: {
          r030: 840,
          txt: 'Долар США',
          rate: 38.9945,
          cc: 'USD',
          exchangedate: '10.04.2024'
        }
      });
    });
  });

  describe('when user changes first input', () => {
    test('updates currency state', async () => {
      const { result } = customRenderHook();

      act(() => {
        result.current.onChangeInput({ value: 100, name: 'firstInput' });
      });

      expect(result.current.currencyState.firstCurrencyInput).toBe(100);
      expect(result.current.currencyState.secondCurrencyInput).toBe(2.56);
    });
  });

  describe('when user changes second input', () => {
    test('updates currency state', async () => {
      const { result } = customRenderHook();

      act(() => {
        result.current.onChangeInput({ value: 100, name: 'secondInput' });
      });

      expect(result.current.currencyState.firstCurrencyInput).toBe(3899.45);
      expect(result.current.currencyState.secondCurrencyInput).toBe(100);
    });
  });

  describe('when user changes any input to a negative value', () => {
    test("doesn't update currency state", async () => {
      const { result } = customRenderHook();

      expect(result.current.currencyState).toEqual(defaultDownloadedState);

      act(() => {
        result.current.onChangeInput({ value: -1, name: 'firstInput' });
      });

      expect(result.current.currencyState).toEqual(defaultDownloadedState);

      act(() => {
        result.current.onChangeInput({ value: -1, name: 'secondInput' });
      });

      expect(result.current.currencyState).toEqual(defaultDownloadedState);
    });
  });

  describe('without selected currency rate', () => {
    test("doesn't update currency state", async () => {
      setExchangeRates({
        response: [
          {
            r030: 840,
            txt: 'Долар США',
            rate: null,
            cc: 'USD',
            exchangedate: '10.04.2024'
          },
          {
            r030: 826,
            txt: 'Фунт стерлінгів',
            rate: 49.4411,
            cc: 'GBP',
            exchangedate: '10.04.2024'
          }
        ]
      });

      const stateWithNoRate = {
        firstCurrencyInput: 0,
        secondCurrencyInput: 1,
        selectedCurrency: {
          r030: 840,
          txt: 'Долар США',
          rate: null,
          cc: 'USD',
          exchangedate: '10.04.2024'
        }
      };

      const { result } = customRenderHook();

      expect(result.current.currencyState).toEqual(stateWithNoRate);

      act(() => {
        result.current.onChangeInput({ value: 100, name: 'secondInput' });
      });

      expect(result.current.currencyState).toEqual(stateWithNoRate);

      act(() => {
        result.current.onChangeInput({ value: 20, name: 'firstInput' });
      });

      expect(result.current.currencyState).toEqual(stateWithNoRate);
    });
  });

  describe('when exchangeRates returns error', () => {
    test('returns empty currency state', () => {
      setExchangeRates({
        ...defaultRatesState,
        response: null,
        error: !null
      });

      const { result } = customRenderHook();

      expect(result.current.currencyState).toEqual({
        firstCurrencyInput: '',
        secondCurrencyInput: '',
        selectedCurrency: null
      });

      expect(localStorage.clear).toHaveBeenCalled();
    });
  });

  describe('when localStorage holds currency state', () => {
    test('updates currency state', () => {
      const currencyState = {
        firstCurrencyInput: 20,
        secondCurrencyInput: 1,
        selectedCurrency: {
          r030: 752,
          txt: 'Шведська крона',
          rate: 3.6968,
          cc: 'SEK',
          exchangedate: '10.04.2024'
        }
      };

      localStorage.setItem('currencyState', JSON.stringify(currencyState));

      const { result } = customRenderHook();

      expect(result.current.currencyState).toEqual(currencyState);
    });
  });

  describe('when onChangeInput() has wrong name value', () => {
    test('updates currency state', () => {
      const { result } = customRenderHook();

      expect(result.current.currencyState).toEqual(defaultDownloadedState);

      act(() => {
        result.current.onChangeInput({ value: 100, name: 'wrongName' });
      });

      expect(result.current.currencyState).toEqual({
        firstCurrencyInput: undefined,
        secondCurrencyInput: undefined,
        selectedCurrency: {
          r030: 840,
          txt: 'Долар США',
          rate: 38.9945,
          cc: 'USD',
          exchangedate: '10.04.2024'
        }
      });
    });
  });
});
