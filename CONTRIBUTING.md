# Contributing to luddy.dance 🕺

Thank you for your interest in contributing to luddy.dance! This guide will help you get started with contributing to this fun Ludwig dance project.

## 🌟 Ways to Contribute

- **🐛 Bug Reports**: Found a bug? Let us know!
- **✨ Feature Requests**: Have an idea to make the site better?
- **🔧 Code Contributions**: Fix bugs or add new features
- **📚 Documentation**: Improve docs, add examples, fix typos
- **🎨 Design**: UI/UX improvements and design suggestions
- **🧪 Testing**: Add tests, improve test coverage
- **⚡ Performance**: Optimize performance, reduce bundle size

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 22.x or later
- **pnpm**: Latest version
- **Git**: For version control

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/luddy.dance.git
   cd luddy.dance
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

Copy the example environment file:
```bash
cp .env.example .env.local
```

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Your Changes

Follow our coding standards (see below) and make your changes.

### 3. Test Your Changes

```bash
# Run all tests
pnpm test

# Run linting
pnpm lint

# Check TypeScript
pnpm biome:check

# Test production build
pnpm build
```

### 4. Commit Your Changes

We use conventional commits for clear commit messages:

```bash
# Examples:
git commit -m "feat: add new dance animation"
git commit -m "fix: resolve video loading issue"
git commit -m "docs: update README with new features"
git commit -m "test: add tests for error boundary"
git commit -m "refactor: improve component structure"
```

**Commit Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

## 📏 Coding Standards

### Code Quality Tools

We use **Biome** for linting and formatting:

```bash
# Check code quality
pnpm biome:check

# Auto-fix issues
pnpm biome:fix

# Format code
pnpm biome:format
```

### TypeScript

- **Use TypeScript** for all new code
- **Define interfaces** for component props
- **Avoid `any`** types - use proper typing
- **Export types** when they might be reused

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// ❌ Avoid
const Button = (props: any) => { ... }
```

### React Components

- **Use function components** with hooks
- **Create reusable components** when possible
- **Follow naming conventions**: PascalCase for components
- **Use proper prop types** and interfaces

```typescript
// ✅ Good
export function DanceButton({ label, onClick }: ButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}
```

### CSS/Styling

- **Use Tailwind CSS** for styling
- **Follow responsive design** principles
- **Use semantic color names** when possible
- **Avoid custom CSS** unless absolutely necessary

```tsx
// ✅ Good
<div className="bg-gradient-to-br from-orange-400 to-pink-400 p-4 rounded-lg">

// ❌ Avoid custom CSS unless needed
<div style={{ background: 'linear-gradient(...)' }}>
```

### File Structure

```
components/
├── ComponentName.tsx      # Component implementation
├── ComponentName.test.tsx # Component tests (if complex)
└── index.ts              # Export file (if needed)

lib/
├── utils.ts              # Utility functions
├── hooks.ts              # Custom hooks
└── types.ts              # Shared TypeScript types
```

## 🧪 Testing Guidelines

### Test Requirements

- **All new features** should include tests
- **Bug fixes** should include regression tests
- **Aim for good coverage** of critical paths
- **Test accessibility** features when relevant

### Testing Tools

- **Vitest**: Test runner
- **React Testing Library**: Component testing
- **Jest DOM**: Additional matchers

### Writing Tests

```typescript
// Example test structure
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ComponentName } from './ComponentName';

test('should render component correctly', () => {
  render(<ComponentName />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui
```

## 📊 Performance Guidelines

### Performance Standards

- **Bundle size**: Keep additions minimal
- **Loading time**: Optimize for fast loading
- **Core Web Vitals**: Maintain good scores
- **Accessibility**: Don't compromise a11y for performance

### Performance Testing

```bash
# Check bundle size
pnpm analyze

# Run Lighthouse
pnpm lighthouse

# Performance budget checks
pnpm lighthouse:assert
```

## 🐛 Bug Reports

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Test on latest version** to ensure bug still exists
3. **Check if it's environment-specific**

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome 91]
- Node.js version: [e.g. 22.1.0]
```

## ✨ Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

## 🔍 Code Review Process

### What We Look For

- **Code quality**: Clean, readable, maintainable code
- **Performance**: No unnecessary performance regressions
- **Testing**: Adequate test coverage for changes
- **Documentation**: Updated docs for new features
- **Accessibility**: Maintains or improves a11y
- **TypeScript**: Proper typing without `any`

### Review Timeline

- **Initial review**: Within 2-3 days
- **Follow-up**: Based on complexity
- **Merge**: After approval and CI passes

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes (backward compatible)

### CI/CD Pipeline

Our GitHub Actions workflow:
1. **Linting**: Biome checks
2. **Testing**: Vitest test suite
3. **Building**: Next.js production build
4. **Performance**: Lighthouse CI
5. **Security**: Dependency scanning

## 💬 Getting Help

### Community

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion

### Contact

- **Maintainer**: [Your GitHub username]
- **Issues**: Use GitHub Issues for project-related questions

## 📜 Code of Conduct

### Our Standards

- **Be respectful** and inclusive
- **Be collaborative** and constructive
- **Focus on the project** and technical discussions
- **Help others learn** and grow

### Unacceptable Behavior

- Harassment, discrimination, or offensive behavior
- Spam, trolling, or disruptive behavior
- Personal attacks or inflammatory language

## 🙏 Recognition

Contributors are recognized in:
- **GitHub Contributors** page
- **Release notes** for significant contributions
- **README acknowledgments** for major features

## 📚 Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **Vitest Guide**: https://vitest.dev/guide/

---

**Thank you for contributing to luddy.dance! 🕺**

*Keep the dance alive!*