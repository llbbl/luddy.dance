# luddy.dance Development Guidelines

## Build/Configuration Instructions

### Package Manager
- **REQUIRED**: Use `pnpm` as the package manager (NOT npm or yarn)
- Install dependencies: `pnpm install --frozen-lockfile`
- Development server: `pnpm dev`
- Production build: `pnpm build`
- Production server: `pnpm start`
- Linting: `pnpm lint`

### Docker Setup
- Uses Node.js 18 slim image
- Builds with `pnpm` inside container
- Exposes port 3000
- Build: `docker build -t luddy-dance .`
- Run: `docker run -p 3000:3000 luddy-dance`

### Build Process
- Next.js 14.1.3 with TypeScript
- Static generation enabled (prerendered pages)
- Build outputs to `.next/` directory
- Production builds are optimized and include build traces

## Project Structure & Configuration

### Path Aliases
- Uses TypeScript path mapping with `@/*` pointing to project root
- Example: `@/components/layout` resolves to `./components/layout`
- Configured in `tsconfig.json` paths section

### Styling Stack
- **Tailwind CSS**: Primary styling framework with TypeScript config
- **Chakra UI**: Component library (v2.8.2)
- Custom gradient utilities defined in Tailwind config:
  - `gradient-radial`: Radial gradients
  - `gradient-conic`: Conic gradients from 180deg

### Fonts & Assets
- Uses Next.js Google Fonts optimization with Inter font
- Global styles located in `assets/styles/globals.css`
- Static assets in `public/` directory

### Application Architecture
- Pages Router (not App Router)
- Global Layout component wraps all pages
- Custom SEO component for meta tags
- Copyright component included in layout

## Additional Development Information

### Code Quality
- ESLint configured with Next.js rules
- TypeScript strict mode enabled
- Current linting warning: Replace `<img>` with `next/image` for optimization

### SEO Configuration
- Hardcoded SEO data in layout component:
  - Title: "10 hours of Ludwig doing the Luddy! 🕺"
  - Description: "Join the dance with Ludwig and enjoy 10 hours of the Luddy dance!"
  - Image: "https://luddy.dance/10hours-luddy.webp"

### Performance Notes
- Bundle size: ~79.3kB first load for main page
- Static generation used for better performance
- Framework chunk: 45.2kB, main chunk: 31.7kB

### Known Issues
- Browserslist database is outdated (run `npx update-browserslist-db@latest`)
- Using `<img>` instead of `next/image` in pages/index.tsx (line 17)

### Environment
- Node.js 18+ required
- TypeScript 5+ with strict configuration
- Next.js 14.1.3 (Pages Router)

### Development Workflow
1. Install with `pnpm install --frozen-lockfile`
2. Start dev server with `pnpm dev`
3. Build and test with `pnpm build`
4. Run linting with `pnpm lint`
5. Use Docker for production deployment testing