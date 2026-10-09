# TODO
- Add a new CV website with this theme : https://github.com/raviriley/agency-jekyll-theme/ OR https://jekyllthemes.io/theme/creative-theme-jekyll


# DONE
- Upgraded the theme from the old Casper/2013-2017 port to match Ghost's official "Edition" theme
  (source was dropped in .tmp/ghost-edition-theme, branch `update-theme-edition-ghost`). All 8
  planned phases landed:

  0. Asset prep — Mulish/Lora fonts in assets/fonts/; icons.hbs partials ported to
     _includes/icons/*.svg (search, share, arrows, chevron, caret-down, avatar, star, loader, x,
     facebook, linkedin, instagram, youtube, bluesky, threads, mastodon, tiktok, github, email).
  1. Design tokens — assets/css/general/{reset,basics,fonts}.css: the shared-theme-assets base
     reset (critically including `html{font-size:62.5%}`, which every rem value in this upgrade
     assumes), the Edition :root vars (--brand-color/--ghost-accent-color/etc.), and self-hosted
     Mulish/Lora @font-face rules.
  2. Layout shell — _layouts/default.html rebuilt around <div class="site"> + gh-head/gh-foot
     (assets/css/site/{header,footer,layout}.css, general/button.css). Logo stayed the existing
     logo_discrete_trans.png image. Nav is _includes/navigation.html, now a plain <ul class="nav">.
     Footer social icons map site.author.links' FontAwesome `icon:` string to the new SVG partials
     (github/envelope matched; anything else falls back to the link label as text, mirroring
     Ghost's own fallback-to-label pattern). Burger menu is in assets/js/index.js.
     Dropped: search icon/button (no Content API to back it), member signup/signin actions.
     Removed the dead `.menu-button`/off-canvas-nav markup duplicated inside each of
     post/page/tag/author-page's own per-template header (it toggled a nav that no longer exists).
  3. Homepage — index.html hero rebuilt as .cover (assets/css/site/cover.css): a plain text block
     normally, fullscreen with a dark overlay + floating transparent header when `page.cover` is
     set. Dropped the old dead "career-ops tutorial" CTA (linked to a page that never existed).
     Kept the Unsplash cover-credit line (license compliance, not an upstream Edition feature).
     _includes/loop.html → Edition's "Expanded" card style (assets/css/blog/feed.css): thumbnail
     placeholder, bold title, excerpt, date + reading time. Dropped the chevron icon (upstream
     hides it in Expanded mode too) and comment counts (no lightweight Disqus count source wired
     up). The card markup now lives in _includes/post_card.html, shared by loop.html (home/tag/
     author feeds) and related-posts.html. New _includes/featured-posts.html (posts with
     `featured: true`, limit 3) — plain CSS grid instead of upstream's tiny-slider carousel, to
     dodge that extra JS dependency; renders nothing until a post actually sets `featured: true`.
     Pagination needed no markup changes — .pagination/.newer-posts/.older-posts/.page-number
     already matched Ghost's own naming, just added assets/css/blog/pagination.css.
  4. Single post — _layouts/post.html rebuilt around Edition's single/gh-canvas pattern: meta row
     (date, reading time, primary tag), title, excerpt (page.excerpt, truncated to 40 words —
     Jekyll's auto-excerpt can run long), a share row (Twitter/Facebook/LinkedIn — dropped the
     dead Google+ share link; Ghost's own share button needs its native-share-sheet JS, which
     needs a Ghost backend we don't have), feature image via `page.image` (see Phase 7 note),
     author footer block, prev/next arrows (page.previous/page.next), related posts (shared tags,
     excluding self/unlisted — _includes/related-posts.html), and the Disqus embed restyled into
     a .gh-comments wrapper. _layouts/page.html got the same treatment minus the meta row and
     footer (matches Ghost's own page.hbs, which reuses post's content partial sans those two).
     Fixed a pre-existing bug while in here: about.md had no front-matter `class:`, so it was
     silently falling through to the "home-template" catch-all in the body-class logic (layout
     front matter isn't merged into `page.*` in Jekyll, so page.html's own `class: 'page-template'`
     never reached about.md) — added `class: 'page-template'` to common/about.md directly, and
     added the matching `.page-template .site-content{padding-block:0}` rule Edition itself ships.
  5. Taxonomy pages — tag.html/author-page.html rebuilt to Edition's taxonomy/single-header
     pattern (assets/css/blog/{taxonomy,author}.css). Dropped tag.html's old hardcoded demo-only
     per-slug overrides (`fables`/`speeches`/`fiction` cover swaps) — dead code tied to a sample
     blog's content that doesn't exist here, and tags autopages are disabled anyway. Author's
     website link uses `.gh-btn` (not `.share-link`, which only has colors for the specific
     x/facebook/linkedin/etc. modifier classes — a bare `.share-link` would've been invisible
     white-on-transparent).
  6. JS cleanup — assets/js/index.js rewritten in vanilla JS (burger toggle, Escape/nav-click to
     close, cover-arrow scrollIntoView). Removed the jQuery CDN script tag and jquery.fitvids.js
     entirely (deleted the file); responsive video embeds now rely on modern browsers deriving
     intrinsic aspect-ratio from an iframe's width/height attributes (assets/css/blog/single.css),
     which needs zero JS. Chat widget (Landbot) and analytics were already dependency-free.
  7. Content/model — standardized on `image:` as a post's own feature-image field (used by both
     its feed-card thumbnail and its single-post figure); `cover:` stays reserved for full-bleed
     page/site-level hero backgrounds (home, about, tag/author headers), which is how this repo
     was already using it before this upgrade. Did not fabricate `image:`/`featured:` values on
     the one existing post, or add fields to _data/authors.yml, since both are editorial decisions
     for the user — the existing authors.yml fields (name/location/bio/url/assets) already cover
     everything author-page.html needs.
  8. QA — deleted the now-fully-unused assets/css/screen.css (48KB, old Casper) and
     assets/css/ghost.min.css, and the orphaned assets/fonts/casper-icons.* icon-font files, all
     confirmed via grep to have zero remaining references anywhere in the templates. Restyled the
     standalone common/404.html (it intentionally doesn't go through the gh-head/gh-foot shell) to
     use the new self-hosted fonts/tokens instead of Open Sans + ghost.min.css. Added
     assets/css/blog/content.css for .gh-content body-copy typography (headings/lists/tables/link
     color inside post & page content) — this and general/reset.css were the one gap: without
     them the new header/nav would've been Mulish but the actual article text would've stayed on
     the old Merriweather/Open Sans with no rem-base fix, i.e. a half-migrated look. Verified with
     repeated `bundle exec jekyll build` (clean every time) plus direct inspection of the rendered
     HTML for home/about/post/author pages. Could not get a live browser screenshot — no Chromium
     binary for Playwright in this sandbox — so a local `bundle exec jekyll serve` eyeball pass is
     still worth doing before considering this merged.

  Explicitly out of scope (no Ghost backend to support them): members/Portal signup, Ghost's
  native search modal, Ghost's own member-comments API (Disqus stays, just restyled).

  Known pre-existing content states this upgrade didn't change (not regressions):
  - The one post in _posts/ is `unlisted: true`, so the homepage/tag/author feeds render correctly
    empty. The site will look "finished but empty" until posts are published normally.
  - Disqus never actually renders on the existing post: the template checks `page.disqus`, which
    the post's front matter never sets (and `site.disqus`/a real shortname isn't configured in
    _config.yml either) — this was true before this upgrade too, just newly visible since comments
    now have real styling waiting for them.
  - A `style.css` file appears in _site/ on every build even after `jekyll clean`; no template
    references it (confirmed via grep) so it has zero effect on the rendered site — likely a
    side effect of one of the Jekyll theme gems bundled by the `github-pages` gem. Not investigated
    further since it's inert.



# MY SCRATCH NOTES
`default.html` contains default HTML nodes for all HTML page templates in this project.