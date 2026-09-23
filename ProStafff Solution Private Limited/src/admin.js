import "./style.css";

const loginScreen = document.querySelector("#login-screen");
const appShell = document.querySelector("#app-shell");
const loginForm = document.querySelector("#login-form");
const loginStatus = document.querySelector("#login-status");
const jobForm = document.querySelector("#job-form");
const jobStatus = document.querySelector("#job-status");

const titles = {
  overview: ["Overview", "Company dashboard"],
  jobs: ["Jobs", "Add and update openings"],
  seekers: ["Candidates", "Job seeker records"],
  employers: ["Employers", "Hire-talent enquiries"],
};

function formField(form, name) {
  return form?.elements?.namedItem(name);
}

async function api(url, options = {}) {
  const { headers, ...rest } = options;
  const isForm = rest.body instanceof FormData;
  const response = await fetch(url, {
    credentials: "same-origin",
    ...rest,
    headers: {
      Accept: "application/json",
      ...(isForm || !rest.body ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
}

function showStatus(node, type, message) {
  if (!node) return;
  node.hidden = false;
  node.textContent = message;
  node.className =
    type === "success"
      ? "mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
      : "mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800";
}

function setView(name) {
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-view") === name);
  });
  document.querySelectorAll("main > section").forEach((section) => {
    section.hidden = section.id !== `view-${name}`;
  });
  const [kicker, title] = titles[name] || titles.overview;
  document.querySelector("#view-kicker").textContent = kicker;
  document.querySelector("#view-title").textContent = title;
  if (name === "overview") loadOverview().catch(() => {});
  if (name === "jobs") loadJobs().catch(() => {});
  if (name === "seekers") loadSeekers().catch(() => {});
  if (name === "employers") loadEmployers().catch(() => {});
  window.lucide?.createIcons({ attrs: { "stroke-width": 1.75 } });
}

function table(headers, rowsHtml) {
  return `
    <table class="w-full min-w-[52rem] text-left text-sm">
      <thead class="bg-navy text-white">
        <tr>${headers.map((h) => `<th class="px-4 py-3 font-semibold">${h}</th>`).join("")}</tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rowsHtml || `<tr><td class="px-4 py-8 text-slate-500" colspan="${headers.length}">No records yet.</td></tr>`}</tbody>
    </table>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function loadOverview() {
  const data = await api("/api/admin/overview");
  document.querySelector("#stat-jobs").textContent = data.jobs;
  document.querySelector("#stat-seekers").textContent = data.seekers;
  document.querySelector("#stat-employers").textContent = data.employers;
  document.querySelector("#recent-seekers").innerHTML =
    data.recentSeekers?.length
      ? data.recentSeekers
          .map(
            (row) =>
              `<div class="rounded-xl bg-slate-50 px-4 py-3"><p class="font-semibold text-navy">${escapeHtml(row.fullName)}</p><p>${escapeHtml(row.preferredRole)} · ${escapeHtml(row.submittedAt)}</p></div>`
          )
          .join("")
      : `<p class="text-slate-500">No candidate submissions yet.</p>`;
  document.querySelector("#recent-employers").innerHTML =
    data.recentEmployers?.length
      ? data.recentEmployers
          .map(
            (row) =>
              `<div class="rounded-xl bg-slate-50 px-4 py-3"><p class="font-semibold text-navy">${escapeHtml(row.company)}</p><p>${escapeHtml(row.contactPerson)} · ${escapeHtml(row.submittedAt)}</p></div>`
          )
          .join("")
      : `<p class="text-slate-500">No employer enquiries yet.</p>`;
}

async function loadJobs() {
  const data = await api("/api/admin/jobs");
  document.querySelector("#jobs-table").innerHTML = table(
    ["Title", "Location", "Category", "Type", ""],
    data.jobs
      .map(
        (job) => `
      <tr>
        <td class="px-4 py-3 font-semibold text-navy">${escapeHtml(job.title)}</td>
        <td class="px-4 py-3">${escapeHtml(job.location)}</td>
        <td class="px-4 py-3">${escapeHtml(job.category)}</td>
        <td class="px-4 py-3">${escapeHtml(job.type)}</td>
        <td class="px-4 py-3">
          <button class="font-semibold text-electric" data-edit-job="${encodeURIComponent(JSON.stringify(job))}" type="button">Edit</button>
          <button class="ml-3 font-semibold text-rose-600" data-delete-job="${escapeHtml(job.id)}" type="button">Remove</button>
        </td>
      </tr>`
      )
      .join("")
  );

  document.querySelectorAll("[data-edit-job]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const job = JSON.parse(decodeURIComponent(btn.getAttribute("data-edit-job")));
      document.querySelector("#job-record-id").value = job.id;
      formField(jobForm, "title").value = job.title;
      formField(jobForm, "location").value = job.location;
      formField(jobForm, "category").value = job.category;
      formField(jobForm, "type").value = job.type;
      formField(jobForm, "description").value = job.description;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-delete-job]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!window.confirm("Remove this job from the public website?")) return;
      await api(`/api/admin/jobs/${btn.getAttribute("data-delete-job")}`, { method: "DELETE" });
      loadJobs();
    });
  });
}

function matches(row, query, keys) {
  if (!query) return true;
  const hay = keys.map((key) => String(row[key] || "")).join(" ").toLowerCase();
  return hay.includes(query.toLowerCase());
}

async function loadSeekers(query = "") {
  const data = await api("/api/admin/seekers");
  const rows = data.records.filter((row) =>
    matches(row, query, ["fullName", "email", "phone", "preferredRole", "experience", "bio"])
  );
  document.querySelector("#seekers-table").innerHTML = table(
    ["Submitted", "Candidate", "Role", "Experience", "Resume", "Bio"],
    rows
      .map(
        (row) => `
      <tr class="align-top">
        <td class="px-4 py-3 whitespace-nowrap">${escapeHtml(row.submittedAt)}<div class="text-xs text-slate-400">${escapeHtml(row.status)}</div></td>
        <td class="px-4 py-3"><p class="font-semibold text-navy">${escapeHtml(row.fullName)}</p><p>${escapeHtml(row.email)}</p><p>${escapeHtml(row.phone)}</p></td>
        <td class="px-4 py-3">${escapeHtml(row.preferredRole)}</td>
        <td class="px-4 py-3">${escapeHtml(row.experience)}</td>
        <td class="px-4 py-3">
          ${row.resumeStored ? `<a class="font-semibold text-electric" href="/api/admin/resumes/${row.id}">Download</a>` : "No file"}
          ${row.resumeLink ? `<div><a class="text-electric" href="${escapeHtml(row.resumeLink)}" target="_blank" rel="noopener">Drive link</a></div>` : ""}
        </td>
        <td class="px-4 py-3 max-w-sm">${escapeHtml(row.bio)}</td>
      </tr>`
      )
      .join("")
  );
}

async function loadEmployers(query = "") {
  const data = await api("/api/admin/employers");
  const rows = data.records.filter((row) =>
    matches(row, query, ["company", "contactPerson", "email", "phone", "staffingType", "message"])
  );
  document.querySelector("#employers-table").innerHTML = table(
    ["Submitted", "Company", "Contact", "Need", "Message"],
    rows
      .map(
        (row) => `
      <tr class="align-top">
        <td class="px-4 py-3 whitespace-nowrap">${escapeHtml(row.submittedAt)}</td>
        <td class="px-4 py-3 font-semibold text-navy">${escapeHtml(row.company)}</td>
        <td class="px-4 py-3"><p>${escapeHtml(row.contactPerson)}</p><p>${escapeHtml(row.email)}</p><p>${escapeHtml(row.phone)}</p></td>
        <td class="px-4 py-3">${escapeHtml(row.staffingType)} · ${escapeHtml(row.openings)} openings</td>
        <td class="px-4 py-3 max-w-md">${escapeHtml(row.message)}</td>
      </tr>`
      )
      .join("")
  );
}

function showApp(signedIn) {
  loginScreen.hidden = signedIn;
  appShell.hidden = !signedIn;
  if (signedIn) setView("overview");
  window.lucide?.createIcons({ attrs: { "stroke-width": 1.75 } });
}

let booted = false;

function bindEvents() {
  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginStatus.hidden = true;
    try {
      await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({
          username: formField(loginForm, "username").value,
          password: formField(loginForm, "password").value,
        }),
      });
      booted = true;
      showApp(true);
    } catch (error) {
      loginStatus.hidden = false;
      loginStatus.textContent = error.message;
    }
  });

  document.querySelector("#logout-btn")?.addEventListener("click", async () => {
    await api("/api/admin/logout", { method: "POST" });
    booted = false;
    showApp(false);
  });

  document.querySelectorAll(".dash-nav").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.getAttribute("data-view")));
  });

  async function saveJob(event) {
    event?.preventDefault();
    try {
      await api("/api/admin/jobs", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(jobForm))),
      });
      const savedTitle = formField(jobForm, "title")?.value || "";
      jobForm.reset();
      document.querySelector("#job-record-id").value = "";
      showStatus(jobStatus, "success", "Job saved. It is now live on the public website.");
      await loadJobs();
      return savedTitle;
    } catch (error) {
      showStatus(jobStatus, "error", error.message);
      return "";
    }
  }

  jobForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveJob(event);
  });
  document.querySelector("#job-save")?.addEventListener("click", saveJob);

  document.querySelector("#job-reset")?.addEventListener("click", () => {
    jobForm.reset();
    document.querySelector("#job-record-id").value = "";
  });

  document.querySelector("#seeker-search")?.addEventListener("input", (event) => {
    loadSeekers(event.target.value);
  });
  document.querySelector("#employer-search")?.addEventListener("input", (event) => {
    loadEmployers(event.target.value);
  });
}

async function boot() {
  bindEvents();
  try {
    const session = await api("/api/admin/session");
    if (!booted) showApp(session.ok);
  } catch {
    if (!booted) showApp(false);
  }
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
