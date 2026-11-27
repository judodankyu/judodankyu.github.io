import { chartHtml, mainHtml, tabsHtml } from "./render";

function $<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} missing`);
  return el as T;
}

const main = $<HTMLElement>("main");

/* The build writes the grades into the page; `bun run dev` serves the bare page, so fill it in here. */
if (!main.firstElementChild) {
  $("cols").innerHTML = chartHtml();
  $("tabs").innerHTML = tabsHtml();
  main.innerHTML = mainHtml();
  // Added after load, so honour a link like #black-2 ourselves.
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
}

/* Search: hide non-matching rows, then any family, grade or stage left empty. */
const q = $<HTMLInputElement>("q");
const empty = $<HTMLElement>("empty");
const emptyTerm = $<HTMLElement>("empty-term");
const status = $<HTMLElement>("status");

q.addEventListener("input", () => {
  const v = q.value.trim().toLowerCase();
  for (const r of main.querySelectorAll<HTMLElement>(".row")) {
    (r.parentElement as HTMLElement).hidden = Boolean(v) && !(r.dataset.s ?? "").includes(v);
  }
  const hideIfEmpty = (sel: string, child: string) => {
    for (const el of main.querySelectorAll<HTMLElement>(sel)) el.hidden = !el.querySelector(`${child}:not([hidden])`);
  };
  hideIfEmpty(".family", "li");
  hideIfEmpty(".grade", ".family");
  hideIfEmpty("[data-stage]", ".grade");
  empty.hidden = Boolean(main.querySelector(".grade:not([hidden])"));
  emptyTerm.textContent = q.value.trim();

  const hits = main.querySelectorAll("li:not([hidden]) > .row:not(.kata)").length;
  status.textContent = v ? (hits === 1 ? "1 match" : `${hits} matches`) : "";

  // Searching from the top of the page: bring the results up under the bar.
  if (v && main.getBoundingClientRect().top > innerHeight * 0.5) main.scrollIntoView({ behavior: "instant" });
});

q.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && q.value) {
    q.value = "";
    q.dispatchEvent(new Event("input"));
  }
});

/* "/" jumps to search, unless the person is already typing somewhere. */
addEventListener("keydown", (e) => {
  const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
  if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    q.focus();
  }
});

/* Mark the grade currently in view in the grade tabs. */
const tabs = new Map([...document.querySelectorAll<HTMLAnchorElement>(".tab")].map((a) => [a.dataset.belt, a]));
const observer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const id = (e.target as HTMLElement).dataset.belt;
      for (const [tabId, a] of tabs) {
        if (tabId === id) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      }
    }
  },
  { rootMargin: "-40% 0px -55% 0px" },
);
for (const s of main.querySelectorAll<HTMLElement>(".grade")) observer.observe(s);
