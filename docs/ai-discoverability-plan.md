# AI discoverability plan

This plan applies GEO-style improvements to dbvc.xyz in small, reviewable commits.
The site is public, static, and text-first, so the default strategy is to maximize
readability and crawlability rather than block AI crawlers.

## Commit 1: document the plan

Goal: record the rollout order and acceptance criteria before changing site behavior.

Acceptance:

- The plan explains the intended crawl posture.
- The plan separates each implementation step into an independently reviewable commit.
- No existing content or route behavior changes.

## Commit 2: add llms.txt

Goal: provide a concise, AI-readable entry point for the site.

Acceptance:

- `public/llms.txt` describes DBvc, the main sections, and canonical URLs.
- The file is copied to `dist/llms.txt` by `npm run build`.
- `robots.txt` continues to allow public crawling.

## Commit 3: add Markdown alternate routes

Goal: make writing and notes available in clean Markdown form in addition to HTML.

Acceptance:

- Published writing entries expose `/writing/<slug>.md`.
- Published note entries expose `/notes/<slug>.md`.
- Article HTML pages advertise the Markdown version with
  `rel="alternate"` and `type="text/markdown"`.
- Draft or future-dated entries are not exposed.

## Commit 4: add project detail pages

Goal: give each project a stable, linkable page instead of only listing projects.

Acceptance:

- Each project entry exposes `/projects/<slug>.html`.
- The projects index links to detail pages.
- Project detail pages include the description, status, tags, repo, demo, and body.
- Build succeeds with empty or populated project collections.

## Later work

- Submit the sitemap to Google Search Console and Bing Webmaster Tools.
- Add richer content to each project page as projects mature.
- Consider Markdown alternate routes for selected legacy SICP archive pages only if
  there is a clear reader or search benefit.
