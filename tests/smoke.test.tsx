import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Component from '../pages/index';

describe('Smoke Tests', () => {
  it('should render the main page component', () => {
    render(<Component />);

    // Check if the main heading is rendered
    expect(screen.getByText(/10 hours of Ludwig doing the Luddy!/)).toBeInTheDocument();
  });

  it('should render the YouTube iframe', () => {
    render(<Component />);

    // Check if the YouTube iframe is present
    const iframe = screen.getByTitle('YouTube video player');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/L3Ucukzbp6k');
  });

  it('should render the loading placeholder image', () => {
    render(<Component />);

    // Check if the loading placeholder is present
    const placeholder = screen.getByAltText('Loading placeholder');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveAttribute('src', '/luddy.svg');
  });
});