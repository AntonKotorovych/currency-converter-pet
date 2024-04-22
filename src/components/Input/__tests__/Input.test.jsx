import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Input from '..';

describe('Input', () => {
  const onChange = jest.fn();

  const requiredProps = {
    type: 'number',
    name: 'firstInput',
    value: 1,
    onChange,
    'data-testid': 'firstInput'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = requiredProps) =>
    render(<Input {...props} />);

  test('renders component correctly', () => {
    renderComponent();

    expect(screen.getByTestId('firstInput')).toBeInTheDocument();
  });

  describe('when user types values', () => {
    test('calls onChange()', async () => {
      renderComponent();

      await user.type(screen.queryByTestId('firstInput'), '1');

      expect(onChange).toHaveBeenCalled();
    });
  });
});
