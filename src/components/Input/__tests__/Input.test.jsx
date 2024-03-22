import { render, screen } from '@testing-library/react';
import Input from '..';

describe('input', () => {
  test('input renders', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument(); // тут IDE не підказує метод toBeInTheDocument а також expect.
  });
});
