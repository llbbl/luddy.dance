# 🕺 luddy.dance

**10 hours of Ludwig doing the Luddy!**

A fun Next.js web app showcasing 10 hours of Ludwig's iconic dance. Built with modern web technologies and optimized for performance.

🌐 **Live Site**: [luddy.dance](https://luddy.dance)

## ✨ Features

- **🎬 YouTube Integration**: Embedded 10-hour Ludwig dance video with lazy loading
- **🎨 Modern Design**: Gradient background with responsive layout
- **⚡ Performance Optimized**: Lighthouse CI, lazy loading, optimized images
- **🛡️ Error Monitoring**: Comprehensive error tracking with structured logging
- **🔍 SEO Ready**: Meta tags, Open Graph, Twitter Cards, structured data
- **♿ Accessible**: ARIA labels, semantic HTML, screen reader friendly
- **🧪 Well Tested**: Vitest + React Testing Library
- **🚀 CI/CD Ready**: GitHub Actions with automated testing and performance monitoring

## 🚀 Tech Stack

### Core
- **Framework**: [Next.js 16.0.3](https://nextjs.org) with React 19.2
- **Language**: TypeScript 5.9
- **Styling**: [Tailwind CSS 4.1.17](https://tailwindcss.com)
- **Runtime**: Node.js 24.x
- **Package Manager**: [pnpm](https://pnpm.io)

### Development & Quality
- **Linting**: [Biome 2.3](https://biomejs.dev) for code quality and formatting
- **Testing**: [Vitest 4.0](https://vitest.dev) + [React Testing Library](https://testing-library.com)
- **Bundle Analysis**: [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Monitoring & Performance
- **Error Tracking**: [logan-logger](https://github.com/llbbl/logan-logger-ts) with structured logging
- **Performance Testing**: [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- **Environment-based Logging**: Production-optimized logging controls

### DevOps
- **CI/CD**: GitHub Actions with automated testing, linting, and performance monitoring
- **Containerization**: Optimized Docker with multi-stage builds (Alpine-based, 234MB)
- **Node Version Testing**: CI matrix testing on Node 20.x, 22.x, and 24.x

## 🏃‍♂️ Quick Start

### Prerequisites
- **Node.js**: 24.x (recommended) or 20.x/22.x
- **pnpm**: Latest version (10.x+)

### Installation

```bash
# Clone the repository
git clone git@github.com:llbbl/luddy.dance.git
cd luddy.dance

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run Biome linting
pnpm biome:check      # Check code formatting
pnpm biome:fix        # Fix linting and formatting issues

# Testing
pnpm test             # Run all tests
pnpm test:ui          # Run tests with UI

# Performance & Analysis
pnpm analyze          # Analyze bundle size
pnpm lighthouse       # Run Lighthouse CI
```

## 🛠️ Development

### Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

**Available Variables**:
- `NODE_ENV`: `development` | `production`
- `NEXT_PUBLIC_ENABLE_LOGGING`: Set to `true` to force enable logging in production

### Project Structure

```
luddy.dance/
├── components/           # React components
│   ├── ErrorBoundary.tsx   # Error boundary with fallback UI
│   ├── SEO.tsx             # SEO meta tags and structured data
│   └── layout.tsx          # Main layout wrapper
├── lib/                  # Utilities and libraries
│   └── logger.ts           # Structured logging with logan-logger
├── pages/                # Next.js pages
│   ├── _app.tsx            # App wrapper
│   └── index.tsx           # Home page with video
├── public/               # Static assets
├── tests/                # Test files
├── .github/workflows/    # GitHub Actions CI/CD
├── docs/                 # Documentation
└── scripts/              # Utility scripts
```

### Code Quality Standards

- **Linting**: Biome with TypeScript and React rules
- **Formatting**: Automatic code formatting with Biome
- **Testing**: Component and integration tests with Vitest
- **Performance**: Lighthouse CI with performance budgets
- **Accessibility**: ARIA labels, semantic HTML, screen reader support

## 🚀 Deployment

### Docker (Recommended)

The app uses an optimized multi-stage Docker build:

**Features**:
- 3-stage build (deps → builder → runner)
- Alpine Linux base image (minimal size)
- Next.js standalone output mode
- Non-root user for security
- **78% size reduction** (1.05GB → 234MB)

```bash
# Build image
docker buildx build --load -t luddy-dance .

# Run container
docker run -p 3000:3000 luddy-dance
```

**Note**: The Dockerfile includes registry override for public npm registry to ensure builds work in CI/CD environments.

### Self-Hosting

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📊 Performance

The app is optimized for performance:

- **Bundle Size**: ~105kB total (excellent for web apps)
- **Core Web Vitals**: Optimized for Google's performance standards
- **Lighthouse Score**: Monitored via CI with performance budgets
- **Image Optimization**: WebP images with Next.js optimization
- **Lazy Loading**: YouTube iframe loads only when visible

### Performance Budgets

- **First Contentful Paint**: < 3 seconds
- **Largest Contentful Paint**: < 4 seconds
- **Cumulative Layout Shift**: < 0.1
- **Scripts**: < 150KB
- **Total Resources**: < 500KB

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Coverage

- **Component rendering**: Smoke tests for all major components
- **User interactions**: Event handling and state updates
- **Error boundaries**: Error handling and fallback UI
- **Accessibility**: Screen reader compatibility

## 🐛 Troubleshooting

### Common Issues

**Build Failures**:
```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

**TypeScript Errors**:
```bash
# Check TypeScript
pnpm biome:check
```

**Performance Issues**:
```bash
# Analyze bundle
pnpm analyze
```

### Logging

Development logging is enabled by default. In production, set `NEXT_PUBLIC_ENABLE_LOGGING=true` to enable detailed logging.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Run linting: `pnpm lint`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Ludwig** for the iconic dance moves
- **Next.js** team for the amazing framework
- **Open source community** for the excellent tools and libraries

---

**Made with ❤️ for the Ludwig community**

*Keep dancing! 🕺*