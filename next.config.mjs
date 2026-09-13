import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

// Next's hydration bootstrap emits inline scripts, so 'unsafe-inline' is required
// until nonce-based CSP is wired through middleware. Turbopack's dev server also
// needs 'unsafe-eval'; the production client bundle does not.
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isProduction ? null : "'unsafe-eval'",
  'https://www.youtube.com',
  'https://www.google.com',
  'https://www.gstatic.com',
  'https://googleads.g.doubleclick.net',
  'https://stats.g.doubleclick.net',
  'https://static.doubleclick.net',
]
  .filter(Boolean)
  .join(' ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for optimized Docker builds
  output: 'standalone',

  // Keep Turbopack scoped to this repository when parent directories contain lockfiles.
  turbopack: {
    root: import.meta.dirname,
  },

  // Security headers configuration
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src ${scriptSrc}`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://i.ytimg.com https://yt3.ggpht.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://static.doubleclick.net",
              "media-src 'self' https://www.youtube.com",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
              "connect-src 'self' https://www.youtube.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://static.doubleclick.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },

          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },

          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },

          // Referrer policy for privacy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },

          // Permissions policy (formerly Feature Policy)
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'payment=()',
              'usb=()',
              'interest-cohort=()',
              'autoplay=(self "https://www.youtube.com")',
              'encrypted-media=(self "https://www.youtube.com")',
              'fullscreen=(self "https://www.youtube.com")',
              'picture-in-picture=(self "https://www.youtube.com")',
            ].join(', '),
          },

          // Strict Transport Security (HSTS) - only enable in production
          ...(process.env.NODE_ENV === 'production'
            ? [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=31536000; includeSubDomains; preload',
                },
              ]
            : []),

          // Cross-Origin policies
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none', // Required for YouTube embeds
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
