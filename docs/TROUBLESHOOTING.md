# 🔧 Troubleshooting Guide

This guide helps you resolve common issues with luddy.dance development, deployment, and runtime problems.

## 🚨 Quick Fixes

### "Have you tried turning it off and on again?"

```bash
# The classic IT fix - clear caches and restart
rm -rf .next node_modules
pnpm install
pnpm dev
```

### Reset to Clean State

```bash
# Nuclear option - completely clean reset
git clean -fdx
git reset --hard HEAD
pnpm install
pnpm build
```

## 🔨 Development Issues

### Node.js & Package Manager

#### Wrong Node.js Version

**Problem**: Using unsupported Node.js version

**Symptoms**:
```bash
error: Unsupported engine
```

**Solution**:
```bash
# Check current version
node --version

# Install correct version (22.x)
nvm install 22
nvm use 22

# Or update .nvmrc
echo "22" > .nvmrc
nvm use
```

#### pnpm Not Found

**Problem**: pnpm not installed globally

**Solution**:
```bash
# Install pnpm
npm install -g pnpm

# Or use corepack (Node.js 16.10+)
corepack enable
corepack prepare pnpm@latest --activate
```

#### Dependency Installation Failed

**Problem**: `pnpm install` fails

**Symptoms**:
```bash
ERR_PNPM_PEER_DEP_ISSUES
```

**Solutions**:
```bash
# Clear pnpm cache
pnpm store prune

# Delete lock file and reinstall
rm pnpm-lock.yaml
pnpm install

# Force install (last resort)
pnpm install --force
```

### Build & TypeScript Issues

#### TypeScript Compilation Errors

**Problem**: TypeScript type errors during build

**Common Issues**:

1. **Missing type definitions**
   ```bash
   # Install missing types
   pnpm add -D @types/node @types/react @types/react-dom
   ```

2. **Import path errors**
   ```typescript
   // ❌ Wrong
   import { Component } from '../../../components/Component'

   // ✅ Correct
   import { Component } from '@/components/Component'
   ```

3. **Strict mode issues**
   ```typescript
   // ❌ Avoid any
   const data: any = response;

   // ✅ Use proper types
   interface ApiResponse {
     data: string;
   }
   const data: ApiResponse = response;
   ```

#### Build Process Failures

**Problem**: `pnpm build` fails

**Common Solutions**:

1. **Clear Next.js cache**
   ```bash
   rm -rf .next
   pnpm build
   ```

2. **Memory issues**
   ```bash
   # Increase Node.js memory
   NODE_OPTIONS="--max_old_space_size=4096" pnpm build
   ```

3. **Environment variables**
   ```bash
   # Check required env vars
   NODE_ENV=production pnpm build
   ```

### Linting & Formatting Issues

#### Biome Configuration Problems

**Problem**: Biome not working correctly

**Solutions**:

1. **Check Biome configuration**
   ```bash
   # Verify biome.json exists and is valid
   pnpm biome check --help
   ```

2. **IDE not picking up Biome**
   - Install Biome VS Code extension
   - Restart IDE
   - Check workspace settings

3. **Conflicting formatters**
   ```json
   // .vscode/settings.json
   {
     "editor.defaultFormatter": "biomejs.biome",
     "editor.formatOnSave": true
   }
   ```

### Development Server Issues

#### Port Already in Use

**Problem**: `Error: listen EADDRINUSE :::3000`

**Solutions**:
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

#### Hot Reloading Not Working

**Problem**: Changes not reflected automatically

**Solutions**:

1. **Check file watching limits (Linux)**
   ```bash
   # Increase inotify limits
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

2. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
   - Clear cache and hard reload in DevTools

3. **Check for syntax errors**
   - Look for JavaScript/TypeScript syntax errors
   - Check browser console for errors

## 🧪 Testing Issues

### Vitest Problems

#### Tests Not Running

**Problem**: `pnpm test` fails to start

**Solutions**:

1. **Check Vitest configuration**
   ```bash
   # Verify vitest.config.ts exists
   cat vitest.config.ts
   ```

2. **Clear test cache**
   ```bash
   # Clear Vitest cache
   rm -rf node_modules/.vitest
   pnpm test
   ```

#### Tests Failing Due to DOM Issues

**Problem**: Tests fail with DOM-related errors

**Solutions**:

1. **Check jsdom setup**
   ```typescript
   // vitest.config.ts
   import { defineConfig } from 'vitest/config'

   export default defineConfig({
     test: {
       environment: 'jsdom',
       setupFiles: './tests/setup.ts'
     }
   })
   ```

2. **IntersectionObserver not defined**
   ```typescript
   // tests/setup.ts
   global.IntersectionObserver = class IntersectionObserver {
     constructor() {}
     disconnect() {}
     observe() {}
     unobserve() {}
   };
   ```

#### Tests Timeout

**Problem**: Tests hang or timeout

**Solutions**:
```bash
# Increase timeout
pnpm test --timeout=30000

# Run tests serially
pnpm test --no-parallel
```

### React Testing Library Issues

#### Elements Not Found

**Problem**: `getByRole` or `getByText` fails

**Solutions**:

1. **Check actual DOM output**
   ```typescript
   import { screen } from '@testing-library/react';

   // Debug rendered output
   screen.debug();

   // Or check specific element
   console.log(screen.getByRole('button').outerHTML);
   ```

2. **Use more flexible queries**
   ```typescript
   // ❌ Too specific
   screen.getByText('Exact text here');

   // ✅ More flexible
   screen.getByText(/partial text/i);
   screen.getByRole('button', { name: /submit/i });
   ```

## 🌐 Runtime Issues

### YouTube Iframe Problems

#### Video Not Loading

**Problem**: YouTube video doesn't appear

**Symptoms**:
- Empty iframe
- Console errors about CORS
- Video placeholder shows but no video

**Solutions**:

1. **Check network connection**
   ```bash
   # Test YouTube connectivity
   curl -I https://www.youtube.com/embed/L3Ucukzbp6k
   ```

2. **Check for ad blockers**
   - Disable ad blockers temporarily
   - Check browser console for blocked requests

3. **Verify iframe attributes**
   ```typescript
   // Ensure proper iframe setup
   <iframe
     src="https://www.youtube.com/embed/L3Ucukzbp6k"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowFullScreen
   />
   ```

#### Lazy Loading Issues

**Problem**: IntersectionObserver not working

**Solutions**:

1. **Check browser support**
   ```javascript
   if ('IntersectionObserver' in window) {
     // Browser supports IntersectionObserver
   } else {
     // Fallback for older browsers
     setShouldLoadIframe(true);
   }
   ```

2. **Debug intersection events**
   ```typescript
   const observer = new IntersectionObserver((entries) => {
     console.log('Intersection entries:', entries);
     // ... rest of code
   });
   ```

### Logging Issues

#### Logs Not Appearing

**Problem**: Expected logs not showing in console

**Solutions**:

1. **Check environment settings**
   ```bash
   # Verify environment
   echo $NODE_ENV

   # Force enable logging
   NEXT_PUBLIC_ENABLE_LOGGING=true pnpm dev
   ```

2. **Check logger configuration**
   ```typescript
   // Verify logger import
   import { log } from '@/lib/logger';

   // Test logger directly
   log.info('Test message');
   ```

#### Production Logging Issues

**Problem**: No logs in production

**Expected Behavior**: Logging is disabled by default in production

**To Enable**:
```bash
# Set environment variable
NEXT_PUBLIC_ENABLE_LOGGING=true
```

### Performance Issues

#### Slow Loading

**Problem**: Site loads slowly

**Diagnostic Steps**:

1. **Check bundle size**
   ```bash
   pnpm analyze
   ```

2. **Run Lighthouse audit**
   ```bash
   pnpm lighthouse
   ```

3. **Check network tab**
   - Open DevTools → Network
   - Look for large resources
   - Check for failed requests

**Common Solutions**:
- Enable CDN (Cloudflare)
- Optimize images
- Enable compression (gzip/brotli)

#### Memory Leaks

**Problem**: Application memory usage increases over time

**Diagnostic**:
```javascript
// Monitor memory usage
console.log(performance.memory);

// Check for event listener leaks
console.log(getEventListeners(document));
```

**Solutions**:
- Cleanup event listeners in useEffect
- Avoid creating functions in render
- Use React.memo for expensive components

## 🚀 Deployment Issues

### Vercel Deployment Problems

#### Build Failures on Vercel

**Problem**: Local build works, Vercel build fails

**Common Causes**:

1. **Environment differences**
   ```bash
   # Match Vercel's Node.js version
   node --version  # Should be 22.x
   ```

2. **Missing environment variables**
   - Add required env vars in Vercel dashboard
   - Check `NEXT_PUBLIC_` prefix for client-side vars

3. **Build command differences**
   ```json
   // package.json - ensure build script is correct
   {
     "scripts": {
       "build": "next build"
     }
   }
   ```

#### Function Timeout

**Problem**: Vercel function timeouts

**Solutions**:
- Optimize API routes
- Use static generation where possible
- Consider serverless function limits

### Docker Issues

#### Docker Build Failures

**Problem**: Docker build fails

**Common Issues**:

1. **Node.js version mismatch**
   ```dockerfile
   # Use specific Node.js version
   FROM node:22-alpine
   ```

2. **pnpm not found**
   ```dockerfile
   # Install pnpm in Dockerfile
   RUN npm install -g pnpm
   ```

3. **Build context issues**
   ```bash
   # Build from correct directory
   docker build -t luddy-dance .
   ```

#### Container Runtime Issues

**Problem**: Container starts but app doesn't work

**Solutions**:

1. **Check exposed ports**
   ```dockerfile
   EXPOSE 3000
   ```

2. **Verify environment variables**
   ```bash
   docker run -e NODE_ENV=production luddy-dance
   ```

3. **Check container logs**
   ```bash
   docker logs container-name
   ```

### SSL/HTTPS Issues

#### Certificate Problems

**Problem**: HTTPS not working or certificate errors

**Solutions**:

1. **Let's Encrypt renewal**
   ```bash
   sudo certbot renew
   ```

2. **Check certificate status**
   ```bash
   sudo certbot certificates
   ```

3. **Verify Nginx configuration**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## 🔍 Debugging Techniques

### Browser DevTools

1. **Console Tab**
   - Check for JavaScript errors
   - Look for failed network requests
   - Monitor performance warnings

2. **Network Tab**
   - Identify slow-loading resources
   - Check for 404 or 500 errors
   - Monitor request/response headers

3. **Performance Tab**
   - Profile runtime performance
   - Identify rendering bottlenecks
   - Check Core Web Vitals

4. **Application Tab**
   - Check local storage
   - Inspect service workers
   - Monitor cache usage

### Server-Side Debugging

#### PM2 Logs

```bash
# View real-time logs
pm2 logs luddy-dance

# View specific number of lines
pm2 logs luddy-dance --lines 100

# Monitor with filters
pm2 logs luddy-dance | grep ERROR
```

#### System Resources

```bash
# Check memory usage
free -h

# Check disk space
df -h

# Monitor processes
top -p $(pgrep -d',' -f luddy-dance)
```

### Application Debugging

#### Add Debug Logging

```typescript
// Temporary debug logging
console.log('Component props:', props);
console.log('State before update:', state);

// Production-safe debug logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', debugData);
}
```

#### React DevTools

1. Install React DevTools browser extension
2. Use Profiler to identify performance issues
3. Inspect component tree and props

## 📞 Getting Help

### Self-Help Resources

1. **Check the logs**
   - Browser console
   - Server logs
   - Build logs

2. **Search existing issues**
   - GitHub Issues
   - Stack Overflow
   - Next.js discussions

3. **Minimal reproduction**
   - Create minimal example
   - Isolate the problem
   - Document steps to reproduce

### Community Support

1. **GitHub Issues**
   - Provide detailed bug reports
   - Include environment information
   - Add screenshots/logs

2. **Error Report Template**
   ```markdown
   **Environment:**
   - OS: [e.g., macOS 14.0]
   - Node.js: [e.g., 22.1.0]
   - Browser: [e.g., Chrome 120]
   - Version: [e.g., latest commit hash]

   **Steps to Reproduce:**
   1. Step one
   2. Step two
   3. See error

   **Expected Behavior:**
   What should happen

   **Actual Behavior:**
   What actually happens

   **Console Output:**
   ```
   Paste error messages here
   ```

   **Additional Context:**
   Any other relevant information
   ```

### Emergency Fixes

#### Site Down

1. **Check server status**
   ```bash
   curl -I https://luddy.dance
   ```

2. **Restart services**
   ```bash
   pm2 restart luddy-dance
   sudo systemctl restart nginx
   ```

3. **Rollback deployment**
   ```bash
   git revert HEAD
   ./scripts/deploy.sh
   ```

#### Performance Emergency

1. **Enable caching**
   - Check CDN configuration
   - Verify cache headers

2. **Scale resources**
   - Increase server specs
   - Add more instances

3. **Disable non-essential features**
   - Turn off logging
   - Disable analytics

---

**Still stuck? Don't panic! 🧘‍♂️**

*Remember: Every bug is just an undocumented feature waiting to be discovered!*