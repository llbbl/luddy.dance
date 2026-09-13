# Troubleshooting

## The local preview will not start

Make sure Docker Desktop is running, then rebuild the container:

```bash
docker compose up --build
```

The preview is available at [localhost:8080](http://localhost:8080), not port 3000.

## The video stays on the loading image

The browser loads the YouTube frame when the player enters the viewport. Check that content blockers or a network policy are not blocking `youtube-nocookie.com`.

## Railway cannot reach the service

The container reads Railway's `PORT` environment variable; locally it defaults to `8080`. Do not add a start command or build command in Railway—the Dockerfile is the complete deployment definition.
