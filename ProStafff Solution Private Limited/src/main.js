import "./style.css";
import { initNav, scrollToId } from "./js/nav.js";
import { initJobBoard } from "./js/job-board.js";
import { initForms, openEmployerTab, openJobSeekerTab } from "./js/forms.js";

function initReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}

function initAnchorCtas() {
  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", (event) => {
      const id = el.getAttribute("data-scroll");
      if (!id) return;
      event.preventDefault();

      if (el.hasAttribute("data-open-employer")) openEmployerTab();
      if (el.hasAttribute("data-open-seeker")) openJobSeekerTab();

      scrollToId(id);
    });
  });
}

function initYear() {
  const year = document.querySelector("#copyright-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function boot() {
  initNav();
  initForms();
  initJobBoard();
  initReveals();
  initAnchorCtas();
  initYear();
  window.lucide?.createIcons({ attrs: { "stroke-width": 1.75 } });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
