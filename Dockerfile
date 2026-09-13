FROM caddy:2.11.4-alpine

RUN addgroup -S caddy && adduser -S -G caddy caddy

COPY --chown=caddy:caddy Caddyfile /etc/caddy/Caddyfile
COPY --chown=caddy:caddy index.html styles.css app.js /usr/share/caddy/
COPY --chown=caddy:caddy public /usr/share/caddy/

USER caddy
EXPOSE 8080
