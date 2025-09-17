import '@testing-library/jest-dom/vitest';

// Mock IntersectionObserver for tests
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(public callback: IntersectionObserverCallback) {}

  observe() {
    // Immediately trigger the callback as if element is intersecting
    this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this);
  }

  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};
