import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Select from '..';

describe('Select', () => {
  const onChange = jest.fn();

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
    onChange
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

  describe('when user selects value', () => {
    test('calls onChange() with correct value', async () => {
      renderComponent();

      await user.selectOptions(screen.getByRole('combobox'), 'AUD');

      expect(onChange).toHaveBeenCalledWith('AUD');
    });
  });
});