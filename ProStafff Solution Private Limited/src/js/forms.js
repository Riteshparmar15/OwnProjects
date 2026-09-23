/**
 * Public Hire Talent and Submit Resume forms.
 * Records are stored by the company server (Excel + resumes) and emailed.
 */
const OWNER_EMAIL = "ritesh.parmar1599@gmail.com";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${OWNER_EMAIL}`;

const employerTab = document.querySelector("#tab-employer");
const seekerTab = document.querySelector("#tab-seeker");
const employerPanel = document.querySelector("#panel-employer");
const seekerPanel = document.querySelector("#panel-seeker");
const preferredRole = document.querySelector("#seeker-role");

function setTab(which) {
  const isEmployer = which === "employer";

  employerTab?.classList.toggle("is-active", isEmployer);
  seekerTab?.classList.toggle("is-active", !isEmployer);
  employerTab?.setAttribute("aria-selected", String(isEmployer));
  seekerTab?.setAttribute("aria-selected", String(!isEmployer));

  if (employerPanel) employerPanel.hidden = !isEmployer;
  if (seekerPanel) seekerPanel.hidden = isEmployer;
}

export function openEmployerTab() {
  setTab("employer");
}

export function openJobSeekerTab() {
  setTab("seeker");
}

export function prefillPreferredRole(title) {
  if (!preferredRole || !title) return;
  preferredRole.value = title;
  preferredRole.dispatchEvent(new Event("change"));
}

function markInvalid(form) {
  form.querySelectorAll("[required]").forEach((field) => {
    field.classList.toggle("is-invalid", !field.checkValidity());
  });
}

function showStatus(form, type, message) {
  const status = form.querySelector("[data-form-status]");
  if (!status) return;
  status.hidden = false;
  status.textContent = message;
  status.className =
    type === "success"
      ? "mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
      : type === "info"
        ? "mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900"
        : "mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800";
}

function isActivationMessage(message) {
  return /activat/i.test(message ?? "");
}

const EMAIL_FIELDS = {
  "employer-form": [
    ["form_type", "Form Type"],
    ["company", "Company Name"],
    ["contact_person", "Contact Person"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["staffing_type", "Staffing Type Needed"],
    ["openings", "Number of Openings"],
    ["message", "Message"],
  ],
  "seeker-form": [
    ["form_type", "Form Type"],
    ["name", "Full Name"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["preferred_role", "Preferred Role / Category"],
    ["experience", "Experience Level"],
    ["resume_link", "Google Drive / Portfolio Link"],
    ["bio", "Short Bio"],
  ],
};

function fieldValue(form, name) {
  const field = form.elements.namedItem(name);
  if (!field || field instanceof RadioNodeList) return "";
  return String(field.value ?? "").trim();
}

function buildEmailPayload(form) {
  const payload = new FormData();
  const labels = EMAIL_FIELDS[form.id] ?? [];
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });
  const replyTo = fieldValue(form, "email");
  const person = fieldValue(form, "name") || fieldValue(form, "contact_person") || "Website visitor";
  const formTitle = fieldValue(form, "form_type") || "Website enquiry";
  const subject =
    form.querySelector("[name='_subject']")?.value || "New enquiry — ProStafff Solution";

  const lines = [
    "ProStafff Solution — Website Submission",
    "========================================",
    `Form: ${formTitle}`,
    `Submitted on: ${submittedAt}`,
    "",
  ];

  for (const [name, label] of labels) {
    const display = fieldValue(form, name) || "Not provided";
    payload.set(label, display);
    lines.push(`${label}: ${display}`);
  }

  const fileInput = form.querySelector('input[type="file"][name="attachment"]');
  const file = fileInput?.files?.[0];
  if (fileInput) {
    const fileLabel = file?.name
      ? `${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`
      : "No file uploaded";
    payload.set("Resume File", fileLabel);
    lines.push(`Resume File: ${fileLabel}`);
    if (file?.size) payload.set("attachment", file);
  }

  payload.set("_subject", `${subject} — ${person}`);
  payload.set("_template", "table");
  payload.set("_captcha", "false");
  payload.set("_honey", "");
  payload.set("from_name", "ProStafff Solution Website");
  if (replyTo) {
    payload.set("email", replyTo);
    payload.set("_replyto", replyTo);
  }
  payload.set("message", lines.join("\n"));

  return payload;
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  markInvalid(form);

  if (!form.checkValidity()) {
    showStatus(form, "error", "Please complete the required fields highlighted above.");
    return;
  }

  const submitBtn = form.querySelector("[type='submit']");
  const originalLabel = submitBtn?.querySelector("[data-btn-label]")?.textContent || submitBtn?.textContent;
  if (submitBtn) submitBtn.disabled = true;

  const payload = new FormData(form);
  const emptyFile = payload.get("attachment");
  if (emptyFile instanceof File && !emptyFile.size) {
    payload.delete("attachment");
  }

  const submitLabel = submitBtn?.querySelector("[data-btn-label]");
  if (submitLabel) submitLabel.textContent = "Sending…";
  else if (submitBtn) submitBtn.textContent = "Sending…";

  try {
    let handled = false;
    try {
      const endpoint =
        form.id === "seeker-form" ? "/api/applications/seeker" : "/api/applications/employer";
      const apiResponse = await fetch(endpoint, { method: "POST", body: payload });
      const apiResult = await apiResponse.json().catch(() => ({}));
      const fromApi = typeof apiResult.ok === "boolean";

      if (apiResponse.ok && apiResult.ok) {
        showStatus(
          form,
          "success",
          "Thank you. Your details have been recorded by the company and emailed to our team."
        );
        form.reset();
        const fileName = form.querySelector("#resume-filename");
        if (fileName) fileName.textContent = "PDF, DOC, or DOCX up to 5 MB";
        handled = true;
      } else if (fromApi && !apiResponse.ok) {
        showStatus(form, "error", apiResult.message || "The company server could not save this form.");
        handled = true;
      }
    } catch {
      /* Fall back to email-only delivery if the company server is offline. */
    }

    if (handled) return;

    const payloadEmail = buildEmailPayload(form);
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: payloadEmail,
    });
    const result = await response.json();
    const resultMessage = String(result.message ?? "");

    if (isActivationMessage(resultMessage)) {
      showStatus(
        form,
        "info",
        `One-time setup: open Gmail for ${OWNER_EMAIL} (check Spam too), click “Activate Form”, then submit this application again. After that, every enquiry arrives automatically.`
      );
      return;
    }

    if (result.success === "true" || result.success === true) {
      showStatus(form, "success", "Thank you. Your details have been sent. Our team will get back to you shortly.");
      form.reset();
      const fileName = form.querySelector("#resume-filename");
      if (fileName) fileName.textContent = "PDF, DOC, or DOCX up to 5 MB";
    } else {
      showStatus(
        form,
        "error",
        resultMessage || `Something went wrong. Please email ${OWNER_EMAIL} directly.`
      );
    }
  } catch {
    showStatus(form, "error", `Network error. Please try again or email ${OWNER_EMAIL}.`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      const label = submitBtn.querySelector("[data-btn-label]");
      if (label) label.textContent = originalLabel;
      else submitBtn.textContent = originalLabel;
      window.lucide?.createIcons({ attrs: { "stroke-width": 1.75 } });
    }
  }
}

export function initForms() {
  employerTab?.addEventListener("click", () => setTab("employer"));
  seekerTab?.addEventListener("click", () => setTab("seeker"));

  document.querySelector("#employer-form")?.addEventListener("submit", handleSubmit);
  document.querySelector("#seeker-form")?.addEventListener("submit", handleSubmit);

  document.querySelectorAll("[data-open-employer]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      openEmployerTab();
    });
  });

  document.querySelectorAll("[data-open-seeker]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      openJobSeekerTab();
    });
  });

  const fileInput = document.querySelector("#seeker-resume");
  const fileName = document.querySelector("#resume-filename");
  const fileDrop = document.querySelector("#resume-drop");

  fileInput?.addEventListener("change", () => {
    if (fileName) {
      fileName.textContent = fileInput.files?.[0]?.name || "PDF, DOC, or DOCX up to 5 MB";
    }
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    fileDrop?.addEventListener(eventName, (event) => {
      event.preventDefault();
      fileDrop.classList.add("is-dragover");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    fileDrop?.addEventListener(eventName, (event) => {
      event.preventDefault();
      fileDrop.classList.remove("is-dragover");
    });
  });

  fileDrop?.addEventListener("drop", (event) => {
    const files = event.dataTransfer?.files;
    if (files?.length && fileInput) {
      fileInput.files = files;
      fileInput.dispatchEvent(new Event("change"));
    }
  });
}
