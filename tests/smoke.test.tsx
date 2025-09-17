import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Component from '../pages/index';

describe('Smoke Tests', () => {
  it('should render the main page component', () => {
    render(<Component />);

    // Check if the main heading is rendered
    expect(screen.getByText(/10 hours of Ludwig doing the Luddy!/)).toBeInTheDocument();
  });

  it('should render the YouTube iframe container', () => {
    render(<Component />);

    // Check if the YouTube iframe is present (it will lazy load)
    const iframe = screen.getByTitle(
      '10 hours of Ludwig doing the Luddy dance - YouTube video player'
    );
    expect(iframe).toBeInTheDocument();
    // In tests, the IntersectionObserver mock triggers immediately
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/L3Ucukzbp6k');
  });

  it('should render the loading placeholder image', () => {
    render(<Component />);

    // Check if the loading placeholder is present with improved alt text
    const placeholder = screen.getByAltText(
      'Ludwig dancing placeholder image showing a purple and orange gradient background while the 10-hour Ludwig Luddy dance video loads'
    );
    expect(placeholder).toBeInTheDocument();
    // Next.js Image component transforms the src attribute
    expect(placeholder).toHaveAttribute('src');
  });
});
