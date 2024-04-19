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
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();

      expect(
        screen.getByText('Актуальні Курси Валют станом на 24.02.2022')
      ).toBeInTheDocument();

      const currencyItems = screen.getAllByRole('listitem');

      expect(currencyItems).toHaveLength(61);

      expect(currencyItems[0]).toHaveTextContent(
        'Австралійський долар - 25.8124 ₴'
      );

      expect(currencyItems[1]).toHaveTextContent('Канадський долар - 28.721 ₴');
    });

    expect(container).toMatchSnapshot();
  });
});
