import { render, screen } from '@testing-library/react';
import MainTitle from '..';

describe('MainTitle', () => {
  const expectedDateFormat = new Intl.DateTimeFormat('uk-UA').format(
    new Date()
  );

  test('renders component correctly', () => {
    render(<MainTitle />);

    const titleElement = screen.getByRole('heading', { level: 1 });

    expect(titleElement).toBeInTheDocument();

    expect(titleElement).toHaveTextContent(
      `Актуальні Курси Валют станом на ${expectedDateFormat}`
    );
  });
});
