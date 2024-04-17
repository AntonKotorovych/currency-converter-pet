import { render, act } from '@testing-library/react';
import {
  ExchangeRatesProvider,
  useExchangeRates
} from 'store/ExchangeRatesProvider';
import { mockResponse } from 'mocks/exchangeRatesResponse';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse)
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ExchangeRatesProvider', () => {
  test('returns fetch request default value', async () => {
    let testValue;

    const TestComponent = () => {
      testValue = useExchangeRates();
      return null;
    };

    await act(async () => {
      render(
        <ExchangeRatesProvider>
          <TestComponent />
        </ExchangeRatesProvider>
      );
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(testValue).toEqual({
      response: mockResponse,
      isLoading: false,
      error: null
    });
  });

  describe('when error', () => {
    test('returns correct error value', async () => {
      let testValue;

      global.fetch = jest.fn().mockResolvedValueOnce({
        json: () => Promise.reject({ title: 'Error 404', name: 'Not Found' })
      });

      const TestComponent = () => {
        testValue = useExchangeRates();
        return null;
      };

      await act(async () => {
        render(
          <ExchangeRatesProvider>
            <TestComponent />
          </ExchangeRatesProvider>
        );
      });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(testValue).toEqual({
        response: null,
        isLoading: false,
        error: { title: 'Error 404', name: 'Not Found' }
      });
    });
  });
});
