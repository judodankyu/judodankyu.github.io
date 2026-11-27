import { pathwayHtml } from "./render";

/* The build writes the pathway into the page; `bun run dev` serves the bare page, so fill it in here. */
const main = document.getElementById("pathway");
if (main && !main.firstElementChild) {
  main.innerHTML = pathwayHtml();
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
}
