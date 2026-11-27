/** Page markup as strings, so the build can write it into index.html and the browser does not have to. */
import { CATEGORY, FAMILIES, GROUPS, KATA_URL, PROHIBITED, type Belt, type Technique } from "./data";

const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Markup built by `html`; only this passes through unescaped. */
class Html {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
  }
}

/** Template tag: every interpolated value is escaped unless it is itself `html` output (or a list of it). */
function html(strings: TemplateStringsArray, ...values: unknown[]): Html {
  const part = (v: unknown): string =>
    v instanceof Html ? v.value : Array.isArray(v) ? v.map(part).join("") : v == null || v === false ? "" : esc(String(v));
  return new Html(strings.reduce((out, s, i) => out + part(values[i - 1]) + s));
}

const belts: readonly Belt[] = GROUPS.flatMap((g) => g.belts);
const TOTAL = belts.reduce((n, b) => n + b.techniques.length, 0);
const shortName = (b: Belt) => b.name.replace(" Belt", "");
/** Sentence case for display: "5th Kyu" → "5th kyu", "Body Drop" → "Body drop". */
const grade = (b: Belt) => b.grade.replace(/Kyu|Dan/, (w) => w.toLowerCase());
const sentence = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();
/** Every grade is named by its number first ("5th kyu", "1st dan"); the belt colour already shows which belt. */
const title = (b: Belt) => grade(b);
const isKyu = (b: Belt) => !b.id.startsWith("black");
/** Secondary name: the Japanese name, plus the belt colour for kyu grades. */
const subtitle = (b: Belt) =>
  html`<span lang="ja">${b.japanese.kanji}</span> ${b.japanese.romaji}${isKyu(b) ? `, ${shortName(b).toLowerCase()} belt` : ""}`;
/** Plain-text description with the colour, for tooltips and screen readers. */
const describe = (b: Belt) => `${grade(b)}, ${b.japanese.romaji}${isKyu(b) ? `, ${shortName(b).toLowerCase()} belt` : ""}`;

/* Hero chart: one belt per grade rising from the ground line; its length = techniques known by that grade. */
function chart(): Html[] {
  let known = 0;
  return belts.map((b) => {
      known += b.techniques.length;
      return html`<li><a class="col" href="#${b.id}" data-belt="${b.id}">
        <span class="plot"><span class="obi" style="--h:${(known / TOTAL) * 100}%"></span></span>
        <span class="count">${known}</span>
        <span class="name">${grade(b)}</span>
        <span class="jp-name" lang="ja">${b.japanese.kanji}</span>
        <span class="sr-only">${isKyu(b) ? ` ${shortName(b).toLowerCase()} belt` : ""}: ${known} of ${TOTAL} techniques known by this grade</span>
      </a></li>`;
    });
}

/* Section opener: a thin band of distant ridge dissolving into mist. Each stage gets its own ridge. */
const RIDGES = [
  "M0 64 C140 40 220 20 320 30 C420 42 470 14 600 10 C720 6 800 34 900 28 C1000 22 1100 36 1200 30 V80 H0Z",
  "M0 60 C120 52 200 30 300 22 C380 16 460 34 560 30 C700 24 760 8 880 14 C980 20 1080 40 1200 34 V80 H0Z",
  "M0 58 C100 44 180 36 260 40 C360 46 440 18 560 12 C660 8 760 26 860 30 C960 34 1060 16 1200 20 V80 H0Z",
];
const opener = (i: number) => html`<svg class="ridge" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
  <g filter="url(#wash)"><path d="${RIDGES[i % RIDGES.length]}" fill="url(#far)"/></g>
  <g class="mist-fill" filter="url(#mist)"><ellipse cx="${360 + i * 220}" cy="70" rx="420" ry="16"/></g>
</svg>`;

function row(t: Technique, n: number): Html {
  const [romaji, kanji, english, cat, videoId] = t;
  const c = CATEGORY[cat];
  const fam = FAMILIES.find((f) => f.cats.includes(cat))!;
  const warn = PROHIBITED.has(romaji) ? html`<span class="warn">Not allowed in randori or competition</span>` : "";
  const search = `${romaji} ${kanji} ${english} ${c.label} ${c.term} ${fam.title}`.toLowerCase();
  return html`<li><a class="row" href="https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}" target="_blank" rel="noopener" data-s="${search}">
    <span class="num">${n}</span>
    <span class="romaji">${romaji}</span>
    <span class="kanji" lang="ja">${kanji}</span>
    <span class="english">${sentence(english)}${warn}</span>
    <span class="kind">${fam.id === "throws" ? html`${c.term} <span class="gloss">${c.label}</span>` : ""}</span>
    <span class="watch">Watch<span class="sr-only"> ${romaji} on the Kodokan channel</span></span>
  </a></li>`;
}

function beltSection(b: Belt): Html {
  const numbered = b.techniques.map((t, i) => [t, i + 1] as const);
  const lists = FAMILIES.map((f) => {
    const items = numbered.filter(([t]) => f.cats.includes(t[3]));
    if (!items.length) return "";
    return html`<div class="family">
      <h4><span class="fam-kanji" lang="ja">${f.kanji}</span>${f.term} <span class="gloss">${f.title.toLowerCase()}</span></h4>
      <ol class="rows">${items.map(([t, n]) => row(t, n))}</ol>
    </div>`;
  });

  const kata = b.kata
    ? html`<div class="family">
        <h4><span class="fam-kanji" lang="ja">形</span>Kata <span class="gloss">forms</span></h4>
        <ol class="rows"><li><a class="row kata" href="${b.kata.video ? `https://www.youtube.com/watch?v=${encodeURIComponent(b.kata.video)}` : KATA_URL}" target="_blank" rel="noopener"
          data-s="${`${b.kata.title} ${b.kata.description} kata`.toLowerCase()}">
          <span class="num">${b.kata.numbers}</span>
          <span class="romaji">${b.kata.title}</span>
          <span class="english">${b.kata.description}</span>
          <span class="watch">${b.kata.video ? "Watch" : "Open textbook"}</span>
        </a></li></ol>
      </div>`
    : "";

  return html`<section class="grade" id="${b.id}" data-belt="${b.id}" aria-labelledby="${b.id}-h">
    <div class="grade-head">
      <span class="obi swatch" aria-hidden="true"></span>
      <h3 id="${b.id}-h">${title(b)} <span class="gloss">${subtitle(b)}, ${b.techniques.length} techniques</span></h3>
    </div>
    ${lists}${kata}
  </section>`;
}

export const chartHtml = (): string => html`${chart()}`.value;

export const tabsHtml = (): string =>
  html`${belts.map((b) => html`<a class="tab" href="#${b.id}" data-belt="${b.id}" title="${describe(b)}">${grade(b)}<span class="jp-name" lang="ja">${b.japanese.kanji}</span></a>`)}`.value;

export const mainHtml = (): string =>
  html`${GROUPS.map(
    (g, i) => html`<div class="stage" data-stage>
    ${opener(i)}
    <h2 class="stage-title">${g.label} <span>${g.age}</span></h2>
    ${g.belts.map(beltSection)}
  </div>`,
  )}`.value;
