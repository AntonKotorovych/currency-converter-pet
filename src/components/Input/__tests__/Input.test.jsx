import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Input from '..';

describe('Input', () => {
  let onChangeInput = jest.fn();

  const requiredProps = {
    type: 'number',
    name: 'firstInput',
    value: 1,
    onChange: onChangeInput,
    'data-testid': 'firstInput'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = requiredProps) =>
    render(<Input {...props} />);

  test('renders component correctly', () => {
    renderComponent();

    expect(screen.queryByTestId('firstInput')).toBeInTheDocument();
  });

  describe('user interacts with the input', () => {
    test('when user types values', async () => {
      renderComponent();

      await user.type(screen.queryByTestId('firstInput'), '1');

      expect(onChangeInput).toHaveBeenCalled();
    });
  });
});
