import { render, screen } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import Input from 'components/Input';

describe('input', () => {
  test('input renders', () => {
    render(<Input />);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toBeInTheDocument();
  });
});
