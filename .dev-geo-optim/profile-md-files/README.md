# Profile markdown files — production placement

These files are drafts. They are NOT wired into the Jekyll build and are not
served by the live site yet. This README documents where each one should
eventually be copied/moved so it becomes retrievable in production, and why
the placement matters.

## `llms.txt` → repo root (`/llms.txt`, builds to `https://rahendarosmedi.com/llms.txt`)

Copy this file to the Jekyll source root (same level as `robots.txt` and
`index.html`). Jekyll copies root-level static files through to `_site/` verbatim (same
mechanism that already publishes `robots.txt` and `CNAME`), so placing it at
the repo root is sufficient for it to be served at `/llms.txt` after the next
build/deploy — no plugin or layout is required.

It must live at this well-known, top-level path (not nested under `/common/`
or `/assets/`) because the llms.txt convention specifically defines `/llms.txt`
at the site root as the expected discovery location, analogous to
`/robots.txt` and `/sitemap.xml` — an LLM or agent checking for it will look
there first and only there
(https://llmstxt.org/).

Before promoting it to the root, add Jekyll front matter so it isn't mistaken
for a page to be rendered with the default layout, e.g.:

```
---
layout: null
permalink: /llms.txt
---
```

(this mirrors the pattern already used by `common/feed.xml`, which sets
`layout: null` and an explicit `permalink` to be served as a raw file rather
than wrapped in `_layouts/default.html`).

## `about.md` → content page, linked from `llms.txt` and the real About page

Recommended production path: `/about/llms.md` or `/llm/about.md` (either is
fine — pick one and keep it consistent with the link already drafted in
`llms.txt`'s "Profile" section). This should be a plain-text/markdown file
served as-is (not run through the HTML page layout), so an AI agent fetching
it gets clean Markdown rather than an HTML document with navigation chrome,
scripts, and CSS around the content. Reuse the same `layout: null` +
`permalink:` front-matter pattern shown above.

This file is a structured duplicate of the prose already on
`common/about.md` / `https://rahendarosmedi.com/about.html` — it exists
because the production About page is HTML wrapped in the site's full layout
(nav, header image, footer, scripts), which costs extra parsing for an LLM
and is more brittle to scrape than a dedicated Markdown document. Once
published, `llms.txt`'s "Profile" section should link directly to this file's
final production URL.

## Why a separate `dev-geo-optim/` staging location

Per the task constraints, nothing in `dev-geo-optim/` has been copied into the
live Jekyll source tree (`_layouts/`, `_includes/`, repo root, etc.) — these
are drafts for the dev team to review, adapt (fill in the `[TODO: fill in]`
placeholders with real/confirmed data — see `geo-recommendations.md` §3.3-3.4
for the name/location inconsistencies that should be resolved first), and then
move into place themselves.
