import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Select from '..';

describe('render select', () => {
  const props = {
    options: [
      {
        value: 'USD',
        label: 'Долар США'
      }
    ],
    value: 'USD',
    onChange: jest.fn()
  };
  test('select renders', () => {
    render(<Select />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  test('select renders with props', () => {
    render(<Select {...props} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });
});

describe('user interacts with options', () => {
  const props = {
    options: [
      {
        value: 'USD',
        label: 'Долар США'
      },
      {
        value: 'AUD',
        label: 'Австралійський долар'
      }
    ],
    value: 'USD',
    onChange: jest.fn()
  };

  test('select renders', async () => {
    render(<Select {...props} />);
    const selectElement = screen.getByRole('combobox');

    await user.selectOptions(selectElement, 'AUD');
    expect(props.onChange).toHaveBeenCalled();
  });
});
