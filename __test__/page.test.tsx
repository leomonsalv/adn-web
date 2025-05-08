// __test__/page.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '@/app/page';
import { ThemeProvider } from '@/components/theme-provider';

describe('Page', () => {
  it('renders a heading', () => {
    render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>,
    );

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
