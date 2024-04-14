import { render, screen } from '@testing-library/react';
import MainTitle from '..';

describe('MainTitle', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2022, 1, 24));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('renders component correctly', () => {
    render(<MainTitle />);

    const titleElement = screen.getByRole('heading', { level: 1 });

    expect(titleElement).toBeInTheDocument();

    expect(titleElement).toHaveTextContent(
      'Актуальні Курси Валют станом на 24.02.2022'
    );
  });
});
