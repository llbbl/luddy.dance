# Contributing

Luddy Dance is a builder-free static site. Its source of truth is `index.html`, `styles.css`, `app.js`, `Caddyfile`, and the files in `public/`.

Make a focused change, then verify the production container locally:

```bash
docker compose up --build
```

Open [localhost:8080](http://localhost:8080) and check the layout, video loading, and browser console. Stop the preview with `docker compose down`.

The project intentionally has no JavaScript package manager, framework, bundler, or application build step. Keep additions dependency-free unless a new product requirement clearly warrants the added maintenance.
