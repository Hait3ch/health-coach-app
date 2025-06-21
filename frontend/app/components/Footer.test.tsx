import { render, screen } from '@testing-library/react';
import Footer from './Footer';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn(), language: 'en-GB' },
  }),
}));

describe('Footer', () => {
  it('renders the copyright', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year} Hai Phan`, 'i'))).toBeInTheDocument();
  });

  it('renders a link to the consent page', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /consent/i });
    expect(link).toHaveAttribute('href', '/consent');
  });
}); 