# dbvc.xyz

Personal site of DBvc / Yang.S. Built with Astro as a static, text-first writing site.

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

## Content

- `src/content/posts`: long-form writing
- `src/content/notes`: short notes
- `src/content/projects`: projects and experiments
- `_posts`: legacy SICP archive

The SICP archive keeps the old dated Markdown posts and publishes them with the legacy `/:category/:slug.html` URL shape.

## Deployment

For Cloudflare Pages or another static host, use:

- Build command: `npm run build`
- Build output directory: `dist`

This repo also includes `wrangler.jsonc` for Cloudflare Workers static assets:

```sh
npm run deploy
```
