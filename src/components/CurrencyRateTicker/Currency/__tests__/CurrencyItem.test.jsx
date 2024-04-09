import { render, screen } from '@testing-library/react';
import CurrencyItem from '..';

describe('CurrencyItem', () => {
  const requiredProps = {
    title: 'Доллар США',
    rate: 50.25
  };

  test('component renders correctly', () => {
    render(<CurrencyItem {...requiredProps} />);

    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});
