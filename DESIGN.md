---
name: Judo Belt Grades Guide
description: The IJF Belt Grades Guide 2026 as a quiet landscape in the manner of Hashimoto Gahō.
colors:
  paper: "#ffffff"
  sumi-ink: "#1f1f1f"
  mist-grey: "#666666"
  hairline: "#e6e6e6"
  ai-indigo: "#1f3a68"
  warning-red: "#b3261e"
  distant-blue-grey: "#b9c8d2"
  ridge-green: "#8fa9a4"
  near-slope-green: "#6f8f86"
  evening-ground: "#14171a"
  evening-ink: "#e9eaeb"
  evening-mist-grey: "#a2a8ad"
  evening-hairline: "#2a2f34"
  evening-indigo: "#9db4e0"
  belt-yellow: "#efb800"
  belt-orange: "#e5741a"
  belt-green: "#2e8b4f"
  belt-blue: "#1f5cb4"
  belt-brown: "#6e4426"
  belt-black: "#1c1c1c"
typography:
  display:
    fontFamily: "Shippori Mincho, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(2.75rem, 6vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Shippori Mincho, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Shippori Mincho, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Zen Kaku Gothic New, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  kanji:
    fontFamily: "Shippori Mincho, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  belt: "3px"
  belt-top: "5px"
  field: "6px"
spacing:
  row-y: "10px"
  row-x: "8px"
  group: "24px"
  grade: "48px"
  stage: "64px"
components:
  grade-tab:
    textColor: "{colors.mist-grey}"
    typography: "{typography.label}"
    height: "44px"
  grade-tab-current:
    textColor: "{colors.sumi-ink}"
  search-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.sumi-ink}"
    rounded: "{rounded.field}"
    padding: "8px 12px"
  technique-row:
    textColor: "{colors.sumi-ink}"
    typography: "{typography.body}"
    padding: "10px 8px"
  watch-link:
    textColor: "{colors.ai-indigo}"
    typography: "{typography.label}"
  belt-swatch:
    rounded: "{rounded.belt}"
    width: "40px"
    height: "12px"
---

# Design System: Judo Belt Grades Guide

## Overview

**Creative North Star: "Mountains in Morning Mist"**

The page is a sheet of white paper with a landscape painted at its head in the manner of Hashimoto Gahō, the Meiji painter who carried the Kanō school into modern Nihonga. Distant ridges in pale blue-grey and blue-green dissolve downward into white; the mist is not painted, it is the paper left bare. The seven belts stand in that landscape as the only saturated colour, rising from a ground line to show how many of the 100 Kodokan techniques each grade has learned.

Everything below the opening scene is a calm reference document: English first, Japanese terms leading each technique group, Kodokan kanji set in a brush-like Mincho, hairline rules between rows, and no decoration that does not help someone find a technique. The world owns the frame (the opening scene, the section openers, the display type); the reading column stays plain.

The audience is worldwide, so English carries the page and Japanese is a quiet companion, never the headline.

**Key Characteristics:**
- White paper ground; mist as negative space, never as a tinted fill.
- Belt colours are the only strong colour on the page.
- Mincho display type, Gothic reading type, kanji in Mincho.
- Hairlines, not boxes; no cards, no shadows.
- Atmosphere at the head of each age stage, quiet everywhere else.

## Colors

A neutral ink-and-paper palette, a mountain palette that exists only inside the painted scenes, one link colour, and the belts.

### Primary
- **Ai Indigo** (ai-indigo): every link and the focus ring. Never used for headings, fills, or decoration.

### Neutral
- **Paper** (paper): the page ground, and the colour of the mist.
- **Sumi Ink** (sumi-ink): headings, technique names, body text.
- **Mist Grey** (mist-grey): secondary text, glosses, numbers, captions, inactive tabs. Holds at least 5.7:1 on Paper.
- **Hairline** (hairline): row rules, the header border, the chart's ground line.
- **Warning Red** (warning-red): only the "Not allowed in randori or contest" note, always as words, never colour alone.

### Landscape (scene colours only)
- **Distant Blue-Grey** (distant-blue-grey), **Ridge Green** (ridge-green), **Near-Slope Green** (near-slope-green): the three mountain washes, each fading from partial opacity to transparent downward.

### Belts
- **Yellow, Orange, Green, Blue, Brown, Black** (belt-*): the grade's own colour in the chart, the grade-heading swatch, and the current-tab underline.

### Evening (dark scheme)
- **Evening Ground** (evening-ground), **Evening Ink** (evening-ink), **Evening Mist Grey** (evening-mist-grey), **Evening Hairline** (evening-hairline), **Evening Indigo** (evening-indigo): the same roles at dusk. The mountains deepen to dark blue-greys and the mist takes the ground colour.

### Named Rules
**The Bare Paper Rule.** The ground is pure white (or Evening Ground). Mist is the ground showing through, never a tint laid over it.

**The Belts-Only Rule.** No saturated colour appears on the page except belt colours. Links stay Ai Indigo; nothing else competes with the belts.

## Typography

**Display Font:** Shippori Mincho (with Hiragino Mincho ProN, Yu Mincho, serif)
**Body Font:** Zen Kaku Gothic New (with system-ui, sans-serif)

**Character:** A brush-descended Mincho for titles and kanji against a clean Japanese Gothic for reading; both families cover Latin and Japanese, so the two scripts sit in one voice.

### Hierarchy
- **Display** (700, clamp 2.75 to 4.75rem, 1.02): the page title only.
- **Headline** (700, 2rem, 1.2): age-stage titles (Fundamental, Competition, Performance judo).
- **Title** (700, 1.375rem, 1.3): grade headings ("5th kyu", "1st dan").
- **Body** (400, 1rem, 1.6): technique names (700), meanings, the lede (1.125rem).
- **Label** (400, 0.875rem): glosses, counts, tabs, captions, "Watch".
- **Kanji** (Mincho 500, 1.25rem): technique kanji in rows; group kanji at 1rem in Mist Grey.

### Named Rules
**The English-First Rule.** English leads every heading and title. Japanese appears as a quieter secondary line or gloss (柔道 段級位 under the title; 初段 Shodan beside "1st dan"), never larger than the English it accompanies.

**The Number-First Rule.** Every grade is named by its number first: "5th kyu" … "1st kyu", "1st dan", "2nd dan". The belt colour already shows which belt, so the colour name is the quieter gloss ("Yellow belt"), and dan grades carry their Japanese name instead (初段 Shodan).

**The Japanese-Term-Leads Rule.** Inside a grade, technique groups are named by their Kodokan term first (Nage-waza) with the English gloss after it in Mist Grey (throws).

## Layout

A single centred column, max 72rem, with fluid gutters (1rem to 2.5rem). The opening scene splits into words on the left (up to 28rem) and the chart on the right; below 60rem it stacks, title first. The chart's painted landscape runs past the column to the window's right edge and fades in on the left.

Technique rows are a six-column grid on wide screens (number, name, kanji, meaning, type, Watch) and stack into three lines when the grade's own width drops below 46rem, measured with a container query rather than the window. Spacing steps: 10px inside rows, 24px between technique groups, 48px between grades, 64px before each age stage. Space above a heading is always larger than space below it.

The header is sticky and carries the wordmark, the seven grade tabs and search; on phones the wordmark hides and tabs and search take full-width rows.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth exists only inside the painted scenes, through atmospheric perspective: paler, bluer ridges are further away, and mist drifting across the taller belts places them inside the landscape.

### Named Rules
**The Atmosphere-Not-Shadow Rule.** Depth comes from wash and mist, never from box-shadow or elevation.

## Shapes

Belts are rectangles with softly rounded corners (3px; 5px at the top of chart belts). The search field has a gently rounded edge (6px). Everything else is square: hairline rules, no cards, no pills, no containers around groups of rows.

## Components

### Navigation (grade tabs)
- **Style:** plain words in Label size, Mist Grey; 44px tall touch targets.
- **Current:** Sumi Ink, bold, with a 3px underline in the grade's own belt colour (light ink for black belts in the evening scheme).
- **Labels:** the grade number ("5th kyu" … "2nd dan"); the colour or Japanese name is in the tooltip and screen-reader text.
- **Mobile:** all seven tabs share one row, spaced evenly.

### Inputs (search)
- **Style:** 1px Hairline border, 6px radius, Paper fill.
- **Focus:** border turns Ai Indigo with the standard focus ring.
- **State:** a live match count ("12 matches") sits inside the field's right edge while searching; "/" focuses it, Esc clears it.

### Technique row
- **Style:** the whole row is one link to the Kodokan video; hairline above and below; hover and keyboard focus tint the row with its belt colour (14% mixed into the page ground) and draw a 3px belt-coloured bar on its left edge, and "Watch" is underlined.
- **Content:** number, romaji (bold), kanji (Mincho), English meaning, type (Te-waza hand), Watch.
- **Prohibited techniques:** a second line in Warning Red, in words.

### Grade heading
- A 40 × 12px belt swatch, then the grade number in Title type and its gloss ("5th kyu" with "Yellow belt, 8 techniques"; "1st dan" with "初段 Shodan, 14 techniques").

### Opening chart (signature)
- Seven belts rising from a hairline ground, each a link to its grade; length is techniques known by that grade out of 100. A painted landscape sits behind and a band of mist drifts in front of the taller belts. Count and grade number sit under the line. No animation: the data is visible from the first frame.

### Stage opener (signature)
- A thin painted ridge dissolving into mist, fading out at both ends, above each age-stage title.

## Do's and Don'ts

### Do:
- **Do** keep the ground pure white (or Evening Ground) and let mist be the ground showing through.
- **Do** keep belt colours as the only saturated colour on the page.
- **Do** lead with English, and put Japanese in quieter secondary lines and glosses.
- **Do** name grades by number first ("5th kyu"), with the colour as the gloss.
- **Do** name technique groups by Kodokan term first, English gloss after.
- **Do** keep painted atmosphere to the opening scene and the stage openers; rows stay plain.
- **Do** credit the source as "Follows the IJF Belt Grades Guide 2026", linked to the PDF.

### Don't:
- **Don't** add ornament motifs (pines, rocks, gold clouds, seals, wooden plates, belt stitching). The user removed each of these; restraint is the style.
- **Don't** tint the background or add warm glows.
- **Don't** let Japanese titles outweigh the English for a worldwide audience.
- **Don't** use IJF or Kodokan logos or imply endorsement.
- **Don't** animate the chart into existence; its values must be visible without motion.
- **Don't** use shadows, cards, gradients on belts, or the Rising Sun ray motif.
