import { render, screen } from '@testing-library/react';
import { mockResponse } from 'mocks/exchangeRatesResponse';
import App from '..';

describe('App', () => {
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

  test('renders component correctly', async () => {
    render(<App />);

    screen.debug();
  });
});
