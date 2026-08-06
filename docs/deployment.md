# Deployment

## Next.js production server

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

Set `NODE_ENV=production`. Browser logging is disabled by default; set `NEXT_PUBLIC_ENABLE_LOGGING=true` only when production diagnostics are needed.

## Docker

The repository includes a multi-stage Dockerfile that builds Next.js standalone output and runs it as a non-root user.

```bash
docker build -t luddy-dance .
docker run --rm -p 3000:3000 luddy-dance
```

Docker Compose is also available:

```bash
docker compose up --build
```

Both options expose the application on [localhost:3000](http://localhost:3000).
