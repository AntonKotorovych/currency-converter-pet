import { render, screen, waitFor } from '@testing-library/react';
import {
  ExchangeRatesProvider,
  useExchangeRates
} from 'store/ExchangeRatesProvider';
import { mockResponse } from 'mocks/exchangeRatesResponse';

describe('ExchangeRatesProvider', () => {
  let originalFetch;

  beforeEach(() => {
    jest.clearAllMocks();

    originalFetch = global.fetch;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const TestComponent = () => {
    const rates = useExchangeRates();
    return JSON.stringify(rates);
  };

  const renderComponent = () =>
    render(
      <ExchangeRatesProvider>
        <div data-testid="container">
          <TestComponent />
        </div>
      </ExchangeRatesProvider>
    );
  describe('when response', () => {
    test('returns fetch request default value', async () => {
      renderComponent();

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(screen.getByTestId('container')).toHaveTextContent(
          JSON.stringify({
            response: mockResponse,
            isLoading: false,
            error: null
          })
        );
      });
    });
  });

  describe('when isLoading', () => {
    global.fetch = jest.fn(() => new Promise(() => {}));

    test('returns isLoading true value', async () => {
      renderComponent();

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(screen.getByTestId('container')).toHaveTextContent(
          JSON.stringify({
            response: null,
            isLoading: true,
            error: null
          })
        );
      });
    });
  });

  describe('when error', () => {
    test('returns correct error value', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: () => Promise.reject({ title: 'Error 404', name: 'Not Found' })
      });

      renderComponent();

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(screen.getByTestId('container')).toHaveTextContent(
          JSON.stringify({
            response: null,
            isLoading: false,
            error: { title: 'Error 404', name: 'Not Found' }
          })
        );
      });
    });
  });
});
