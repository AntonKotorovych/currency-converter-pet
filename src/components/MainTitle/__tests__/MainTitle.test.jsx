import { render, screen } from '@testing-library/react';
import MainTitle from '..';

describe('MainTitle', () => {
  const mockDate = new Date();

  const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  spy.mockRestore();

  test('renders component correctly', () => {
    render(<MainTitle />);

    const titleElement = screen.getByRole('heading', { level: 1 });

    expect(titleElement).toBeInTheDocument();

    expect(titleElement).toHaveTextContent(
      `Актуальні Курси Валют станом на ${Intl.DateTimeFormat('uk-UA').format(mockDate)}`
    );
  });
});
