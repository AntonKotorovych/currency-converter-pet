import { render, screen } from '@testing-library/react';

import Error, { Props } from '..';

describe('Error', () => {
  const requiredProps: Props = { title: '404', message: 'Not Found' };

  const renderComponent = (props = requiredProps) => {
    render(<Error {...props} />);
  };

  test('renders component correctly', () => {
    renderComponent();

    const error = screen.getByRole('heading', { level: 3 });

    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('Сталася помилка: 404. Not Found');
  });
});
