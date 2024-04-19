import { render, screen } from '@testing-library/react';
import { mockResponse } from 'mocks/exchangeRatesResponse';
import App from '..';

describe('App', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const renderComponent = () => render(<App />);

  test('renders component correctly', async () => {
    renderComponent();

    screen.debug();
  });
});
