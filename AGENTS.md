# AGENTS.md

Guidance for anyone (people and AI coding agents) working on this repository.

## What this is

A public, English-language reference to the **IJF Belt Grades Guide 2026**: every grade from 5th kyu (yellow belt) to 2nd dan, every required technique, and the kata, with each technique linked to its official Kodokan demonstration video. Published at https://judodankyu.github.io/ by a judo club, for judoka and coaches worldwide.

Read these before changing anything substantial:

- `PRODUCT.md`: who the site is for, what it must do, and product decisions already made.
- `DESIGN.md`: the visual system ("Mountains in Morning Mist", in the manner of Hashimoto Gahō). Its rules are binding.
- `.impeccable/surfaces/index-html.md`: the design direction contract for the page.

## Commands

```sh
bun install          # once
bun run dev          # local preview with live reload
bun run typecheck    # TypeScript strict check (must pass)
bun run build        # production site in dist/
```

Requires [Bun](https://bun.sh). There are no other dependencies besides TypeScript.

## Layout

| Path | What it is |
|---|---|
| `index.html` | Page markup and the shared SVG paint (wash and mist filters, mountain gradients). |
| `src/data.ts` | **All grade content**: grades, techniques, kata, categories. Edit content here. |
| `src/main.ts` | Renders the chart, grade tabs, grade lists, search, active-tab tracking. |
| `src/styles.css` | All styles: modern CSS (`@layer`, nesting, `light-dark()`, container queries). |
| `.github/workflows/deploy.yml` | Builds with Bun and publishes `dist/` to GitHub Pages on every push to `main`. |
| `dist/` | Build output. Never edit or commit it. |

No framework, no runtime dependencies, no server. Keep it that way unless there is a strong reason.

## Content rules (src/data.ts)

- **The source of truth is the IJF Belt Grades Guide 2026 (ENG, v12)**: https://78884ca60822a34fb0e6-082b8fd5551e97bc65e327988b444396.ssl.cf3.rackcdn.com/up/2026/03/BeltGradesGuide_2026v12-177270-1772700594.pdf
- Keep the guide's **grades, order and item numbering** exactly. Numbers in the lists are the guide's own numbers; kata rows keep their number ranges (for example `13–14`).
- Correct only evident errors, and record each correction in `PRODUCT.md`. Already corrected: 送足払 (Okuri-ashi-harai) and 支釣込足 (Sasae-tsurikomi-ashi), which were misprinted in the PDF.
- Each technique is `[romaji, kanji, english, category, youtubeId]`. The `youtubeId` must be the technique's video on the **official KODOKAN YouTube channel** (the "KODOKAN × IJF ACADEMY 100 Techniques" playlist / Kodokan "Names of Judo Techniques" page). Verify any new or changed ID before committing; never link third-party videos.
- Techniques the Kodokan prohibits in randori and contest are listed in `PROHIBITED` and shown with a warning. Keep that list accurate.
- When the IJF publishes a new guide, update the content, the source link in `index.html` (two places) and `PRODUCT.md`.

## Design rules (summary of DESIGN.md)

- **English first.** Japanese appears as quieter secondary text (柔道 段級位 under the title, 初段 Shodan beside "1st dan"), never larger than the English.
- **Grade number first.** Grades are named "5th kyu" … "1st kyu", "1st dan", "2nd dan"; the belt colour ("Yellow belt") is the gloss, because the belt itself already shows the colour.
- **Japanese term leads technique groups:** "Nage-waza" first, "throws" after in grey.
- **White paper ground** (evening ground in dark mode). No background tints or warm glows. Mist is the page ground showing through.
- **Belt colours are the only saturated colour.** Links are indigo; nothing else competes.
- **No ornament.** No pines, rocks, gold clouds, seals, wooden plates, belt stitching, gradients on belts, shadows, cards, or the Rising Sun ray motif. Each was tried and rejected.
- **No chart animation.** Data must be visible without motion.
- **Fonts:** Shippori Mincho (display, kanji), Zen Kaku Gothic New (text). Loaded from Google Fonts.
- Painted atmosphere belongs only to the opening scene and the stage openers; technique lists stay plain.

## Attribution and claims

- State the relationship as **"Follows the IJF Belt Grades Guide 2026"**, linked to the PDF. Do not use IJF or Kodokan logos or imply endorsement.
- Only black-belt (dan) requirements are binding on federations under the IJF programme; colour-belt requirements are applied differently by each federation. Never describe kyu requirements as mandatory everywhere.
- No invented testimonials, statistics or endorsements.

## Quality bar (check before every push)

1. `bun run typecheck` and `bun run build` pass.
2. Look at the page at phone (390px), tablet and desktop widths, in light and dark mode. All seven grade tabs fit on one row on a phone.
3. Search works for romaji, kanji and English (for example "seoi", "絞", "strangle"); Esc clears it; "/" focuses it.
4. Accessibility (WCAG 2.2 AA): heading order h1 → h2 (age stage) → h3 (grade) → h4 (technique group) with no skipped levels; text contrast at least 4.5:1; touch targets at least 24px (tabs are 44px tall); every link has a meaningful name.
5. No horizontal scrolling at any width.

## Workflow

- Commit to `main` only when the checks pass; the push publishes the site.
- Keep changes small and focused; one concern per commit.
- For design work, the project uses the [Impeccable](https://github.com/pbakaus/impeccable) design skill. Its context files (`PRODUCT.md`, `DESIGN.md`, `.impeccable/`) are committed so any collaborator's agent shares the same decisions. After visual changes, keep `DESIGN.md` in step with the built code.
