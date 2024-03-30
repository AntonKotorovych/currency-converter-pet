import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Select from '..';

describe('select', () => {
  let onChangeSelect = jest.fn();

  const requiredProps = {
    options: [
      {
        value: 'USD',
        label: 'Долар США'
      },
      {
        value: 'AUD',
        label: 'Австралійський долар'
      },
      {
        value: 'EUR',
        label: 'Євро'
      }
    ],
    value: 'USD',
    onChange: onChangeSelect
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = requiredProps) =>
    render(<Select {...props} />);

  test('renders component correctly', () => {
    renderComponent();

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  describe('user interacts with options', () => {
    test('user change option', async () => {
      renderComponent();

      await user.selectOptions(screen.getByRole('combobox'), 'AUD');

      expect(onChangeSelect).toHaveBeenCalledWith('AUD');
    });
  });
});
