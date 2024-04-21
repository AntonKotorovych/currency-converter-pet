import { render, screen, waitFor } from '@testing-library/react';
import { mockResponse } from 'mocks/exchangeRatesResponse';
import App from 'App';

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

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2022, 1, 24));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const renderComponent = () => render(<App />);

  test('renders component correctly', async () => {
    const { container } = renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId('currency-rate-container')).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
