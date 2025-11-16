module.exports = {
  ci: {
    // Collect settings
    collect: {
      // Number of runs per URL
      numberOfRuns: 3,
      // URLs to test (relative to server URL)
      url: ['http://localhost:3000'],
      // Start a local server to test
      startServerCommand: 'pnpm build && pnpm start',
      startServerReadyPattern: /ready in/i,
      startServerReadyTimeout: 30000,
      // Chrome settings
      settings: {
        // Use headless Chrome
        chromeFlags: '--no-sandbox --headless --disable-gpu',
        // Throttling to simulate slower connections
        throttlingMethod: 'simulate',
        // Skip certain audits for CI speed
        skipAudits: [
          'screenshot-thumbnails',
          'final-screenshot',
          'largest-contentful-paint-element',
          'layout-shift-elements',
        ],
      },
    },

    // Upload settings (configure for your preferred service)
    upload: {
      // Local filesystem storage (development)
      target: 'filesystem',
      outputDir: './lighthouse-reports',
      // Alternative: Upload to Lighthouse CI server
      // target: 'lhci',
      // serverBaseUrl: 'https://your-lhci-server.com',
      // token: process.env.LHCI_TOKEN,
    },

    // Assertion settings (performance budgets)
    assert: {
      // Performance assertions
      assertions: {
        // Core Web Vitals thresholds
        'categories:performance': ['error', { minScore: 0.75 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Specific performance metrics
        'first-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 4000 }],

        // Resource optimization
        'unused-javascript': ['warn', { maxNumericValue: 50000 }],
        'unused-css-rules': ['warn', { maxNumericValue: 20000 }],
        'modern-image-formats': 'off', // We're already using WebP
        'uses-optimized-images': 'warn',

        // Best practices (disabled for localhost testing)
        'is-on-https': 'off', // Disabled for localhost testing
        'uses-http2': 'off', // Disabled for localhost testing
        'efficient-animated-content': 'warn',
      },

      // Budgets for resource sizes
      budgets: [
        {
          path: '/*',
          timings: [
            { metric: 'first-contentful-paint', budget: 3000 },
            { metric: 'largest-contentful-paint', budget: 4000 },
            { metric: 'speed-index', budget: 4000 },
            { metric: 'interactive', budget: 5000 },
          ],
          resourceSizes: [
            { resourceType: 'script', budget: 150 }, // KB
            { resourceType: 'image', budget: 300 },
            { resourceType: 'stylesheet', budget: 50 },
            { resourceType: 'total', budget: 500 },
          ],
        },
      ],
    },
  },
};
