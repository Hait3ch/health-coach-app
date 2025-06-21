import { render, screen } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';

jest.mock('@clerk/nextjs', () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignedOut: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignInButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignUpButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  UserButton: () => <div>UserButton</div>,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key === 'app-title' ? 'Health Coach App' : key,
    i18n: { changeLanguage: jest.fn(), language: 'en-GB' },
  }),
}));

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header />);
    expect(screen.getByText(/health coach app/i)).toBeInTheDocument();
  });
}); 