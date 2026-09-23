import { jobs as fallbackJobs, categoryLabels } from "../data/jobs.js";
import { scrollToId } from "./nav.js";
import { openJobSeekerTab, prefillPreferredRole } from "./forms.js";

const grid = document.querySelector("#jobs-grid");
const emptyState = document.querySelector("#jobs-empty");
const countEl = document.querySelector("#jobs-count");
const filterButtons = document.querySelectorAll("[data-job-filter]");

let activeFilter = "all";
let jobs = fallbackJobs;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function jobCard(job) {
  const category = categoryLabels[job.category] ?? job.category;

  return `
    <article class="lift-card rounded-2xl border border-slate-200 bg-white p-6 flex flex-col" data-category="${escapeHtml(job.category)}">
      <div class="flex items-start justify-between gap-3">
        <span class="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-electric">
          ${escapeHtml(category)}
        </span>
        <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">${escapeHtml(job.type)}</span>
      </div>
      <h3 class="mt-4 text-lg font-bold text-navy">${escapeHtml(job.title)}</h3>
      <p class="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500">
        <i data-lucide="map-pin" class="size-4 text-electric"></i>
        ${escapeHtml(job.location)}
      </p>
      <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600">${escapeHtml(job.description)}</p>
      <button
        type="button"
        class="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-electric"
        data-apply-job="${escapeHtml(job.id)}"
        data-apply-title="${escapeHtml(job.title)}"
      >
        Apply Now
        <i data-lucide="arrow-right" class="size-4"></i>
      </button>
    </article>
  `;
}

function renderJobs() {
  if (!grid) return;

  const visible =
    activeFilter === "all"
      ? jobs
      : jobs.filter((job) => job.category === activeFilter);

  grid.innerHTML = visible.map(jobCard).join("");

  if (emptyState) {
    emptyState.hidden = visible.length > 0;
  }

  if (countEl) {
    countEl.textContent =
      visible.length === 1
        ? "1 open role"
        : `${visible.length} open roles`;
  }

  window.lucide?.createIcons({ attrs: { "stroke-width": 1.75 } });

  grid.querySelectorAll("[data-apply-job]").forEach((button) => {
    button.addEventListener("click", () => {
      openJobSeekerTab();
      prefillPreferredRole(button.getAttribute("data-apply-title"));
      scrollToId("contact");
    });
  });
}

export async function initJobBoard() {
  if (!grid) return;

  try {
    const response = await fetch("/api/jobs");
    const data = await response.json();
    if (data.ok && Array.isArray(data.jobs) && data.jobs.length) {
      jobs = data.jobs;
    }
  } catch {
    jobs = fallbackJobs;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.getAttribute("data-job-filter") ?? "all";
      filterButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      renderJobs();
    });
  });

  renderJobs();
}
