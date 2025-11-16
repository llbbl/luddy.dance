# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application showcasing a 10-hour loop of Ludwig doing the "Luddy" dance. It's a simple, single-page application with embedded YouTube content.

## Technology Stack

- **Framework**: Next.js 16.0.3 (Pages Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4.1.17
- **Runtime**: Node.js 24.x (CI tests on 20.x, 22.x, 24.x)
- **Package Manager**: pnpm 10.x+
- **TypeScript**: 5.9 with strict mode
- **Testing**: Vitest 4.0 + React Testing Library
- **Linting**: Biome 2.3

## Development Commands

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint
```

## Docker

### Multi-Stage Build
The Dockerfile uses an optimized 3-stage build:
1. **deps**: Install dependencies (Alpine, Node 24)
2. **builder**: Build the application with Next.js standalone output
3. **runner**: Minimal runtime image (234MB, 78% reduction from original)

**Key optimizations**:
- Alpine Linux base (minimal footprint)
- Next.js standalone output mode (enabled in `next.config.mjs`)
- Non-root user for security
- NPM registry override for CI/CD compatibility
- Only production dependencies in final image

```bash
# Build Docker image
docker buildx build --load -t luddy-dance .

# Run container
docker run -p 3000:3000 luddy-dance
```

**Note**: The Dockerfile includes `registry=https://registry.npmjs.org/` override to ensure builds work in CI/CD environments with local `.npmrc` configurations.

## Architecture

### File Structure
- `pages/` - Next.js pages directory using Pages Router
  - `_app.tsx` - App wrapper with global layout
  - `index.tsx` - Main page component with YouTube embed
- `components/` - Reusable React components
  - `layout.tsx` - Main layout wrapper with SEO and copyright
  - `SEO.tsx` - SEO meta tags component
  - `Copyright.tsx` - Footer copyright component
- `assets/styles/` - Global CSS styles
- `public/` - Static assets (images, SVGs, favicon)
  - `favicon.svg` - Custom "L" favicon (purple/blue gradient)
  - `favicon.ico` - Generated from SVG using sharp
- `scripts/` - Utility scripts
  - `generate-favicon.mjs` - Generates favicon.ico from favicon.svg

### Key Features
- YouTube iframe embedding with loading states
- Responsive design with Tailwind CSS
- Custom gradient backgrounds
- SEO optimization with meta tags
- Loading placeholder while iframe loads

### Configuration
- **Path Aliases**: `@/*` maps to project root via tsconfig.json
- **Tailwind**: Configured for pages/, components/, and app/ directories
- **TypeScript**: Strict mode enabled with Next.js plugin
- **Next.js Config**:
  - Standalone output mode for optimized Docker builds
  - Comprehensive security headers (CSP, HSTS, etc.)
  - Bundle analyzer integration

## Important Notes

- Uses Pages Router (not App Router)
- Single-page application focused on video content
- Responsive design with viewport-aware sizing
- Loading states for better UX with iframe content