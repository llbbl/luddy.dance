import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { trackPerformance } from '@/lib/logger';
import Component from '../pages/index';

vi.mock('@/lib/logger', () => ({
  log: {
    appReady: vi.fn(),
    componentMount: vi.fn(),
  },
  reportError: vi.fn(),
  setUserContext: vi.fn(),
  trackPerformance: vi.fn(),
}));

const defaultIntersectionObserver = global.IntersectionObserver;

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  global.IntersectionObserver = defaultIntersectionObserver;
  vi.restoreAllMocks();
});

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
    expect(iframe).not.toHaveAttribute('role', 'application');
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

  it('ignores the initial blank load and records the video load as elapsed time', () => {
    let intersectionCallback: IntersectionObserverCallback | undefined;
    global.IntersectionObserver = class IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin = '';
      readonly thresholds: ReadonlyArray<number> = [];
      readonly scrollMargin = '';

      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }

      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    };

    let currentTime = 100;
    vi.spyOn(performance, 'now').mockImplementation(() => currentTime);

    render(<Component />);
    const iframe = screen.getByTitle(
      '10 hours of Ludwig doing the Luddy dance - YouTube video player'
    );
    const placeholderAlt =
      'Ludwig dancing placeholder image showing a purple and orange gradient background while the 10-hour Ludwig Luddy dance video loads';

    fireEvent.load(iframe);

    expect(iframe).not.toHaveAttribute('src');
    expect(screen.getByAltText(placeholderAlt)).toBeInTheDocument();
    expect(trackPerformance).not.toHaveBeenCalledWith('iframe_load', expect.any(Number));

    act(() => {
      if (!intersectionCallback) {
        throw new Error('IntersectionObserver callback was not registered');
      }
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry], {
        disconnect() {},
      } as IntersectionObserver);
    });

    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/L3Ucukzbp6k');

    currentTime = 145;
    fireEvent.load(iframe);

    expect(screen.queryByAltText(placeholderAlt)).not.toBeInTheDocument();
    expect(trackPerformance).toHaveBeenCalledWith('iframe_load', 45);
  });
});
