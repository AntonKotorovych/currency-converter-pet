import { render, screen } from '@testing-library/react';
import Error from '..';

describe('Error', () => {
  const renderComponent = (props = { title: '404', message: 'not found' }) => {
    render(<Error {...props} />);
  };

  test('renders component correctly', () => {
    renderComponent();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});
