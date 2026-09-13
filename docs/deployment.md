# Deployment

Railway builds the included `Dockerfile`. It contains only version-pinned Caddy and the static site files; there is no Node, Bun, package installation, or application build step.

The `Caddyfile` listens on Railway's `PORT` variable (or port 8080 locally) and applies the site's security headers.

For a local production-equivalent container:

```bash
docker build -t luddy-dance .
docker run --rm -e PORT=8080 -p 8080:8080 luddy-dance
```
