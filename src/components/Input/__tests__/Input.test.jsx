import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Input from '..';

describe('render input', () => {
  const props = {
    type: 'number',
    name: 'firstInput',
    value: 1,
    onChange: jest.fn()
  };
  test('input renders', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('input renders without errors with all required props', () => {
    render(<Input {...props} />);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toBeInTheDocument();
  });
});

describe('user interacts with the input', () => {
  test('user fill some value into input', async () => {
    render(<Input type="number" />);
    const inputElement = screen.getByRole('spinbutton');
    await user.clear(inputElement);
    await user.type(inputElement, '1');
    await user.type(inputElement, '2');
    expect(inputElement).toHaveValue(12);
  });

  test('onChange is called when user change inputs value', async () => {
    const handleChange = jest.fn();
    render(<Input type="number" onChange={handleChange} />);
    const inputElement = screen.getByRole('spinbutton');
    await user.type(inputElement, '1');
    expect(handleChange).toHaveBeenCalled();
  });
});
