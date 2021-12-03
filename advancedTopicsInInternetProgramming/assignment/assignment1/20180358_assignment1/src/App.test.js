import { render, screen } from '@testing-library/react';
import MainComponent from './MainComponent';

test('renders learn react link', () => {
  render(<MainComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
