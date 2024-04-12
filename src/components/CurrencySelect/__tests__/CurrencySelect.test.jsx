import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { useExchangeRates } from 'store/ExchangeRatesProvider';
import { mockResponse } from 'mocks/exchangeRatesResponse';
import CurrencySelect from '..';

jest.mock('store/ExchangeRatesProvider');

describe('CurrencySelect', () => {
  const defaultRatesState = {
    response: []
  };

  const setExchangeRates = (state = defaultRatesState) =>
    useExchangeRates.mockReturnValue(state);

  const onChange = jest.fn();

  const requiredProps = {
    value: 'USD',
    onChange
  };

  const renderComponent = (props = requiredProps) =>
    render(<CurrencySelect {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    setExchangeRates();
  });

  test('renders component correctly', () => {
    renderComponent();

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  describe('user select options', () => {
    describe('with response', () => {
      describe('with selected currency', () => {
        test('calls onChange()', async () => {
          setExchangeRates({ response: mockResponse });

          renderComponent();

          await user.selectOptions(screen.getByRole('combobox'), 'EUR');

          expect(onChange).toHaveBeenCalledWith({
            cc: 'EUR',
            txt: 'Євро',
            rate: 42.3519,
            r030: 978,
            exchangedate: '10.04.2024'
          });
        });
      });
    });

    describe('without response', () => {
      test('does not call onChange()', async () => {
        setExchangeRates({ response: null });

        renderComponent();

        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();

        await user.click(select);

        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });
});
