# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application showcasing a 10-hour loop of Ludwig doing the "Luddy" dance. It's a simple, single-page application with embedded YouTube content.

## Technology Stack

- **Framework**: Next.js 14 (Pages Router)
- **Styling**: Tailwind CSS
- **Runtime**: Node.js 22
- **Package Manager**: pnpm (configured in Dockerfile and user preferences)
- **TypeScript**: Fully configured with strict mode

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

## Docker Commands

```bash
# Build Docker image
docker buildx build --load -t luddy-local .

# The Docker setup uses pnpm and Node.js 22
```

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

## Important Notes

- Uses Pages Router (not App Router)
- Single-page application focused on video content
- Responsive design with viewport-aware sizing
- Loading states for better UX with iframe content