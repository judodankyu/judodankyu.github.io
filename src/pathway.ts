import { pathwayHtml } from "./render";

const main = document.getElementById("pathway");

if (main) {
  /* The build writes the pathway into the page; `bun run dev` serves the bare page, so fill it in here. */
  if (!main.firstElementChild) {
    main.innerHTML = pathwayHtml();
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }

  /* Keep the age-track switch below the sticky header, whatever the header's height on this screen. */
  const bar = document.querySelector<HTMLElement>(".bar");
  const fitBar = () => document.documentElement.style.setProperty("--bar-h", `${bar?.offsetHeight ?? 0}px`);
  fitBar();
  if (bar) new ResizeObserver(fitBar).observe(bar);

  /* Tint the step that crosses a line just above the middle of the screen, as the reader scrolls. */
  main.classList.add("tracking");
  const steps = [...main.querySelectorAll<HTMLElement>(".step")];
  let reading: HTMLElement | null = null; // the step last tinted, kept across an age-track switch
  const update = () => {
    const line = innerHeight * 0.42;
    const current = steps.find((s) => {
      const r = s.getBoundingClientRect();
      return r.height > 0 && r.top <= line && r.bottom > line; // height 0: in the hidden age track
    });
    if (current) reading = current;
    for (const s of steps) {
      if (s === current) s.setAttribute("aria-current", "step");
      else s.removeAttribute("aria-current");
    }
  };
  // The observer only wakes us when a step edge crosses that line; the work is in update().
  const observer = new IntersectionObserver(update, { rootMargin: "-42% 0px -57% 0px" });
  for (const s of steps) observer.observe(s);
  // Age-track switch: keep the reader on the same belt in the other track, rather than jumping to the top.
  main.addEventListener("change", () => {
    const belt = reading?.dataset.belt;
    update();
    const same = steps.find((s) => s.dataset.belt === belt && s.getBoundingClientRect().height > 0);
    same?.scrollIntoView({ block: "center", behavior: "instant" });
    update();
  });
  update();
}
