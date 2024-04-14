import { screen, render } from '@testing-library/react';
import { mockResponse } from 'mocks/exchangeRatesResponse';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import HomePage from '..';

jest.mock('store/ExchangeRatesProvider');

describe('HomePage', () => {
  const defaultRatesState = {
    response: mockResponse
  };

  const setExchangeRates = (state = defaultRatesState) =>
    useExchangeRates.mockReturnValue(state);

  const renderComponent = () => render(<HomePage />);

  beforeEach(() => {
    jest.clearAllMocks();
    setExchangeRates();
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2022, 1, 24));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('matches snapshot', () => {
    const { container } = renderComponent();

    screen.debug();

    expect(container).toMatchSnapshot();
  });
});
