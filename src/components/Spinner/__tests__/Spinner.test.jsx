import { render, screen } from '@testing-library/react';
import Spinner from '..';

describe('Spinner', () => {
  test('renders component correctly', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
