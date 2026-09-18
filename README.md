# Nafi Majeed — portfolio

A single-page portfolio built from the CV in `assets/NAFEEA NAFEEA_Resume.pdf`.
Vanilla HTML, CSS and JavaScript — no build step. Open `index.html` in a browser,
or serve the folder (`python3 -m http.server`) if you want the CV download link
to behave exactly as it will in production.

```
content.js    every piece of editable text/data on the site — see "Editing content"
index.html    markup + the Tailwind @theme token block
styles.css    all styling, driven by those tokens
render.js     turns content.js into the DOM (builds lists, computes the chronology chart)
script.js     theme toggle, clocks, scroll reveals, scrollspy, copy-to-clipboard
assets/       the CV PDF and the dossier photo (nafi.png) — swap files here, no code changes
```

## The idea

An official personnel file, set like an editorial page — which is what the CV is
about: records, documentation, compliance. Warm paper, black ink, a red stamp.
Sections are numbered like form fields, metadata is set in monospace, and the
theme toggle flips the whole thing to a film negative.

- **Display** — Bodoni Moda
- **Body** — Familjen Grotesk
- **Labels & data** — IBM Plex Mono

## Design tokens

Tailwind's browser build supplies the token layer via `@theme` in `index.html`;
`styles.css` mirrors the same values in `:root` so the page still renders correctly
if the CDN is unreachable. Themes are handled by a second, semantic layer
(`--bg`, `--fg`, `--accent`, …) that `[data-theme="film"]` overrides — so no
token is ever redefined in two places.

## Chart colors

Two marks carry data: the **chronology band** (study vs. work) and the
**language meters** (a single-hue ordinal scale). The categorical pair was
validated rather than eyeballed — lightness band, chroma floor, colorblind
separation, normal-vision separation and contrast all pass in both themes:

| | Study | Work | Surface |
|---|---|---|---|
| Paper | `#33489B` | `#C4442B` | `#F2EDE4` |
| Film | `#7C8FE0` | `#E4573C` | `#14120F` |

Identity never rests on color alone — every bar is directly labelled and dated,
every meter states its level in words, and a legend is present.

## Editing content

All content lives in `content.js` as a single plain-language data object —
name, jobs, dates, skills, languages, contact info. `render.js` reads it on
page load and builds the corresponding DOM (lists, cards, the chronology
chart), so `index.html` itself holds almost no literal copy anymore, just
structural containers with ids that `render.js` targets.

`content.js` has a full walkthrough in its header comment and is written for
a non-technical editor (see `HOW TO EDIT.txt` at the repo root for the
short version). If you're changing structure rather than content — adding a
new section, changing what a card looks like — edit `render.js` (the string
templates) and `index.html`/`styles.css` together, then extend the
`SITE_CONTENT` schema in `content.js` to match.

The chronology chart no longer needs manual percentage math: entries take
real `"YYYY-MM"` dates (or `"present"` for an ongoing one) in
`content.js`'s `chronology.entries`, and `render.js` computes each bar's
position/width and the year gridlines from those dates, setting a
`--year-w` CSS variable so the gridline spacing always matches the
computed axis (see `.chrono-track::before` in `styles.css`).

`render.js` wraps each section in a try/catch so a typo in one part of
`content.js` (a missing quote/comma/bracket) logs a console error instead
of breaking the whole page.

The dossier photo (`assets/nafi.png`, currently a generated placeholder) and
the CV PDF are both swapped by replacing the file in `assets/` — `content.js`
only needs editing if the new file's name changes (`hero.photo.src` /
`hero.resumeFile`).

## Notes

- Respects `prefers-color-scheme` on first visit, then remembers the choice in
  `localStorage`.
- All motion is disabled under `prefers-reduced-motion: reduce`.
- No analytics, no external requests beyond Google Fonts and the Tailwind CDN.
