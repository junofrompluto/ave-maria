# AVE MARIA — *The Second Wind*

A cinematic teaser-and-pitch website for the feature film **AVE MARIA** (working
alt-title *The Second Wind*) — a braided survival drama, **based on a true story**:
two families, twenty years and an ocean of privilege apart, bound together by a
single rescue in the Florida Straits.

> Written by **Grady Meadows · Camilo Gonzalez · Lou Castro.**
> Two of the people who lived it wrote it.

---

## What this is

A single-page, scroll-driven site that opens as a public teaser and deepens into
a financier-facing pitch:

- **Hero** — the animated title-card cinemagraph (father carrying his son through
  the firefly-lit mangrove).
- **Logline + credits** — the hook and the authenticity line.
- **One ocean, two fates** — the dramatic-irony premise.
- **Three worlds, one sea** — the two-world color system (La Guadalupe / Breezing
  Up / The Second Wind).
- **The voyage** — the key story beats (departure, storm, the rope, the vow, the
  rescue).
- **Characters** — the people on the boats.
- **Themes** — what it's really about.
- **The filmmakers** — the rescuer-and-the-rescued hook, and the 77,000 statistic.
- **Contact** — request the pitch deck (Netlify Forms + mailto fallback).

The visual language follows the project's "living deck" rules: **almost nothing
moves.** Ember-glow titles that breathe, slow Ken Burns drift, film grain, a
soft vignette — ambient life, not motion graphics. Fully responsive and
`prefers-reduced-motion` aware.

## Tech

Plain HTML/CSS/JS — **no build step.** Fonts: Cinzel (display), Cormorant
Garamond (quotes), Inter (body).

```
avemaria/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   ├── video/hero.mp4          # title-card cinemagraph (watermark cropped, compressed)
│   └── img/
│       ├── hero-poster.jpg
│       ├── scenes/             # story-beat & world frames
│       └── chars/              # character portraits
└── netlify.toml
```

## Run locally

```bash
python3 -m http.server 8080
# visit http://localhost:8080
```

## Deploy (Netlify)

1. **Add new site → Import an existing project → GitHub** and pick this repo.
2. Settings come from `netlify.toml` (publish `.`, no build command).
3. Deploy. The **contact form** works automatically via Netlify Forms — submissions
   appear under **Forms** in the Netlify dashboard (and you can add email
   notifications). Off Netlify, the form falls back to a `mailto:` to
   `loumcastro@gmail.com`.

## Imagery & video

All art is project-generated concept frames for *AVE MARIA*, optimized for web
(scenes ≤1920px JPEG; the hero cinemagraph re-encoded H.264 with `+faststart`).
Swap any file at the same path to update a frame.

---

*Based on a true story. Anamorphic 2.39:1.*
