# dbvc.github.io

Just Sicp, now built with Astro.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

Astro writes the static site to `dist/`.

## Deploy to Cloudflare

For Cloudflare Pages, use:

- Build command: `npm run build`
- Build output directory: `dist`

For Cloudflare Workers static assets, use:

```sh
npm run deploy
```

The current Astro migration keeps the old Jekyll content in `_posts/` and publishes dated Markdown posts with the legacy `/:category/:slug.html` URL shape.
