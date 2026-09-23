import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import express from "express";
import multer from "multer";
import { config } from "./config.js";
import { notifyOwner } from "./mail.js";
import {
  addEmployer,
  addSeeker,
  deleteJob,
  ensureStorage,
  listEmployers,
  listJobs,
  listSeekers,
  overview,
  resumePath,
  upsertJob,
} from "./storage.js";

const ALLOWED_RESUME = new Set([".pdf", ".doc", ".docx"]);
const COOKIE = "prostafff_admin";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

await ensureStorage();

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, config.resumesDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || ".pdf";
      cb(null, `${req.recordId}${ext}`);
    },
  }),
  limits: { fileSize: config.maxResumeBytes },
  fileFilter: (_req, file, cb) => {
    if (!file.originalname) {
      cb(null, false);
      return;
    }
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_RESUME.has(ext)) {
      cb(new Error("Resume must be a PDF, DOC, or DOCX file."));
      return;
    }
    cb(null, true);
  },
});

function signToken() {
  const payload = Buffer.from(
    JSON.stringify({ role: "admin", exp: Date.now() + WEEK_MS })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", config.sessionSecret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function readToken(token) {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", config.sessionSecret).update(payload).digest("base64url");
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

function parseCookies(header = "") {
  const out = {};
  header.split(";").forEach((part) => {
    const [key, ...rest] = part.trim().split("=");
    if (key) out[key] = decodeURIComponent(rest.join("="));
  });
  return out;
}

function requireAdmin(req, res, next) {
  const token = parseCookies(req.headers.cookie)[COOKIE];
  if (!readToken(token)) {
    res.status(401).json({ ok: false, message: "Please sign in to the company dashboard." });
    return;
  }
  next();
}

function slugify(value) {
  return String(value || "role")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function stampId() {
  return crypto.randomUUID();
}

function nowLabel() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });
}

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.get("/api/jobs", async (_req, res) => {
  res.json({ ok: true, jobs: await listJobs() });
});

app.post("/api/applications/seeker", (req, res, next) => {
  req.recordId = stampId();
  next();
}, upload.single("attachment"), async (req, res) => {
  try {
    const body = req.body || {};
    const stored = req.file ? req.file.filename : "";
    const record = {
      id: req.recordId,
      fullName: String(body.name || "").trim(),
      email: String(body.email || "").trim(),
      phone: String(body.phone || "").trim(),
      preferredRole: String(body.preferred_role || "").trim(),
      experience: String(body.experience || "").trim(),
      bio: String(body.bio || "").trim(),
      resumeLink: String(body.resume_link || "").trim(),
      resumeOriginal: req.file?.originalname || "",
      resumeStored: stored,
    };

    if (!record.fullName || !record.email || !record.phone || !record.preferredRole || !record.experience || !record.bio) {
      res.status(400).json({ ok: false, message: "Please complete all required candidate fields." });
      return;
    }

    await addSeeker(record);

    const lines = [
      "ProStafff Solution — Job Seeker Submission",
      "========================================",
      `Record ID: ${record.id}`,
      `Submitted on: ${nowLabel()}`,
      "",
      `Full Name: ${record.fullName}`,
      `Email: ${record.email}`,
      `Phone: ${record.phone}`,
      `Preferred Role / Category: ${record.preferredRole}`,
      `Experience Level: ${record.experience}`,
      `Google Drive / Portfolio Link: ${record.resumeLink || "Not provided"}`,
      `Short Bio: ${record.bio}`,
      `Resume File: ${record.resumeOriginal || "No file uploaded"}`,
      "",
      "This record is stored in the company Excel file and dashboard.",
    ];

    notifyOwner({
      subject: `New job application — ${record.fullName}`,
      lines,
      replyTo: record.email,
    }).catch(() => {});

    res.json({ ok: true, id: record.id });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message || "Could not save the application." });
  }
});

app.post("/api/applications/employer", upload.none(), async (req, res) => {
  try {
    const body = req.body || {};
    const record = {
      id: stampId(),
      company: String(body.company || "").trim(),
      contactPerson: String(body.contact_person || "").trim(),
      email: String(body.email || "").trim(),
      phone: String(body.phone || "").trim(),
      staffingType: String(body.staffing_type || "").trim(),
      openings: String(body.openings || "").trim(),
      message: String(body.message || "").trim(),
    };

    if (!record.company || !record.contactPerson || !record.email || !record.phone || !record.staffingType || !record.openings || !record.message) {
      res.status(400).json({ ok: false, message: "Please complete all required employer fields." });
      return;
    }

    await addEmployer(record);

    const lines = [
      "ProStafff Solution — Employer Enquiry",
      "========================================",
      `Record ID: ${record.id}`,
      `Submitted on: ${nowLabel()}`,
      "",
      `Company Name: ${record.company}`,
      `Contact Person: ${record.contactPerson}`,
      `Email: ${record.email}`,
      `Phone: ${record.phone}`,
      `Staffing Type Needed: ${record.staffingType}`,
      `Number of Openings: ${record.openings}`,
      `Message: ${record.message}`,
      "",
      "This record is stored in the company Excel file and dashboard.",
    ];

    notifyOwner({
      subject: `New employer enquiry — ${record.company}`,
      lines,
      replyTo: record.email,
    }).catch(() => {});

    res.json({ ok: true, id: record.id });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message || "Could not save the enquiry." });
  }
});

app.post("/api/admin/login", (req, res) => {
  const user = String(req.body?.username || "").trim();
  const password = String(req.body?.password || "");
  if (user !== config.adminUser || password !== config.adminPassword) {
    res.status(401).json({ ok: false, message: "Incorrect username or password." });
    return;
  }
  res.setHeader(
    "Set-Cookie",
    `${COOKIE}=${signToken()}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${WEEK_MS / 1000}`
  );
  res.json({ ok: true, user });
});

app.post("/api/admin/logout", (_req, res) => {
  res.setHeader("Set-Cookie", `${COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`);
  res.json({ ok: true });
});

app.get("/api/admin/session", (req, res) => {
  const token = parseCookies(req.headers.cookie)[COOKIE];
  res.json({ ok: Boolean(readToken(token)), user: config.adminUser });
});

app.get("/api/admin/overview", requireAdmin, async (_req, res) => {
  res.json({ ok: true, ...(await overview()) });
});

app.get("/api/admin/seekers", requireAdmin, async (_req, res) => {
  res.json({ ok: true, records: await listSeekers() });
});

app.get("/api/admin/employers", requireAdmin, async (_req, res) => {
  res.json({ ok: true, records: await listEmployers() });
});

app.get("/api/admin/jobs", requireAdmin, async (_req, res) => {
  res.json({ ok: true, jobs: await listJobs() });
});

app.post("/api/admin/jobs", requireAdmin, async (req, res) => {
  const job = {
    id: String(req.body?.id || `${slugify(req.body?.title)}-${Date.now()}`),
    title: String(req.body?.title || "").trim(),
    location: String(req.body?.location || "").trim(),
    category: String(req.body?.category || "in-store").trim(),
    type: String(req.body?.type || "Permanent").trim(),
    description: String(req.body?.description || "").trim(),
  };
  if (!job.title || !job.location || !job.description) {
    res.status(400).json({ ok: false, message: "Title, location, and description are required." });
    return;
  }
  await upsertJob(job);
  res.json({ ok: true, job });
});

app.delete("/api/admin/jobs/:id", requireAdmin, async (req, res) => {
  await deleteJob(req.params.id);
  res.json({ ok: true });
});

app.get("/api/admin/export.xlsx", requireAdmin, (_req, res) => {
  if (!fs.existsSync(config.excelFile)) {
    res.status(404).json({ ok: false, message: "No Excel records yet. Submit a form first." });
    return;
  }
  res.download(config.excelFile, "ProStafff-Records.xlsx");
});

app.get("/api/admin/resumes/:id", requireAdmin, async (req, res) => {
  const seekers = await listSeekers();
  const record = seekers.find((item) => item.id === req.params.id);
  if (!record?.resumeStored) {
    res.status(404).json({ ok: false, message: "No resume file for this candidate." });
    return;
  }
  const file = resumePath(record.resumeStored);
  if (!fs.existsSync(file)) {
    res.status(404).json({ ok: false, message: "Resume file is missing on disk." });
    return;
  }
  res.download(file, record.resumeOriginal || record.resumeStored);
});

app.use((error, _req, res, next) => {
  if (!error) return next();
  res.status(400).json({ ok: false, message: error.message || "Upload failed." });
});

if (fs.existsSync(config.distDir)) {
  app.use(express.static(config.distDir));
  app.get(/^(?!\/api).*/, (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    const admin = req.path === "/admin" || req.path === "/admin.html";
    const file = admin ? "admin.html" : "index.html";
    res.sendFile(path.join(config.distDir, file));
  });
}

app.listen(config.port, () => {
  console.log(`ProStafff company system running at http://localhost:${config.port}`);
});
