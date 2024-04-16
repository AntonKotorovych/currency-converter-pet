import { render, screen } from '@testing-library/react';
import CurrencyItem from '..';

describe('CurrencyItem', () => {
  const requiredProps = {
    title: 'Доллар США',
    rate: 50.25
  };

  const renderComponent = (props = requiredProps) => {
    render(<CurrencyItem {...props} />);
  };

  test('renders component correctly', () => {
    renderComponent();

    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  describe('with correct title', () => {
    test('renders component correctly', () => {
      renderComponent();

      const currencyItem = screen.getByRole('listitem');

      expect(currencyItem).toBeInTheDocument();
      expect(currencyItem).toHaveTextContent('Доллар США - 50.25 ₴');
    });
  });
});
