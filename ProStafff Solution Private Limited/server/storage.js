import fs from "node:fs/promises";
import path from "node:path";
import ExcelJS from "exceljs";
import { config } from "./config.js";

const SEEKER_SHEET = "Job Seekers";
const EMPLOYER_SHEET = "Employers";
const NAVY = "0F172A";
const BLUE = "2563EB";

const seekerColumns = [
  { header: "Record ID", key: "id", width: 38 },
  { header: "Submitted At (IST)", key: "submittedAt", width: 28 },
  { header: "Status", key: "status", width: 14 },
  { header: "Full Name", key: "fullName", width: 28 },
  { header: "Email", key: "email", width: 32 },
  { header: "Phone", key: "phone", width: 18 },
  { header: "Preferred Role / Category", key: "preferredRole", width: 28 },
  { header: "Experience Level", key: "experience", width: 22 },
  { header: "Short Bio", key: "bio", width: 42 },
  { header: "Google Drive / Portfolio Link", key: "resumeLink", width: 36 },
  { header: "Resume Original Name", key: "resumeOriginal", width: 28 },
  { header: "Resume Stored File", key: "resumeStored", width: 28 },
];

const employerColumns = [
  { header: "Record ID", key: "id", width: 38 },
  { header: "Submitted At (IST)", key: "submittedAt", width: 28 },
  { header: "Status", key: "status", width: 14 },
  { header: "Company Name", key: "company", width: 28 },
  { header: "Contact Person", key: "contactPerson", width: 24 },
  { header: "Email", key: "email", width: 32 },
  { header: "Phone", key: "phone", width: 18 },
  { header: "Staffing Type Needed", key: "staffingType", width: 22 },
  { header: "Number of Openings", key: "openings", width: 20 },
  { header: "Message", key: "message", width: 48 },
];

let writeChain = Promise.resolve();

function queueWrite(task) {
  const next = writeChain.then(task, task);
  writeChain = next.catch(() => {});
  return next;
}

export async function ensureStorage() {
  await fs.mkdir(config.dataDir, { recursive: true });
  await fs.mkdir(config.resumesDir, { recursive: true });
  await loadWorkbook();
}

function styleHeader(sheet) {
  const row = sheet.getRow(1);
  row.height = 22;
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, name: "Calibri", size: 11 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${NAVY}` } };
    cell.alignment = { vertical: "middle", wrapText: true };
    cell.border = {
      bottom: { style: "thin", color: { argb: `FF${BLUE}` } },
    };
  });
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: sheet.columns.length },
  };
}

async function createWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ProStafff Solution Private Limited";
  workbook.created = new Date();

  const seekers = workbook.addWorksheet(SEEKER_SHEET);
  seekers.columns = seekerColumns;
  styleHeader(seekers);

  const employers = workbook.addWorksheet(EMPLOYER_SHEET);
  employers.columns = employerColumns;
  styleHeader(employers);

  await workbook.xlsx.writeFile(config.excelFile);
  return workbook;
}

async function loadWorkbook() {
  try {
    await fs.access(config.excelFile);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(config.excelFile);
    const seekers = workbook.getWorksheet(SEEKER_SHEET);
    const employers = workbook.getWorksheet(EMPLOYER_SHEET);
    if (!seekers || !employers) return createWorkbook();
    seekers.columns = seekerColumns;
    employers.columns = employerColumns;
    styleHeader(seekers);
    styleHeader(employers);
    return workbook;
  } catch {
    return createWorkbook();
  }
}

function nowIst() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function cellText(value) {
  if (value == null) return "";
  if (typeof value === "object") {
    if (value.text != null) return String(value.text);
    if (value.result != null) return String(value.result);
    if (Array.isArray(value.richText)) return value.richText.map((part) => part.text).join("");
  }
  return String(value);
}

function sheetToRecords(sheet, columns) {
  const rows = [];
  sheet.eachRow((row, index) => {
    if (index === 1) return;
    const record = {};
    columns.forEach((column, offset) => {
      record[column.key] = cellText(row.getCell(offset + 1).value);
    });
    if (record.id && record.id !== "Record ID") rows.push(record);
  });
  return rows.reverse();
}

export async function listSeekers() {
  const workbook = await loadWorkbook();
  return sheetToRecords(workbook.getWorksheet(SEEKER_SHEET), seekerColumns);
}

export async function listEmployers() {
  const workbook = await loadWorkbook();
  return sheetToRecords(workbook.getWorksheet(EMPLOYER_SHEET), employerColumns);
}

export async function addSeeker(record) {
  return queueWrite(async () => {
    const workbook = await loadWorkbook();
    const sheet = workbook.getWorksheet(SEEKER_SHEET);
    sheet.addRow({
      status: "New",
      submittedAt: nowIst(),
      ...record,
    });
    styleHeader(sheet);
    await workbook.xlsx.writeFile(config.excelFile);
  });
}

export async function addEmployer(record) {
  return queueWrite(async () => {
    const workbook = await loadWorkbook();
    const sheet = workbook.getWorksheet(EMPLOYER_SHEET);
    sheet.addRow({
      status: "New",
      submittedAt: nowIst(),
      ...record,
    });
    styleHeader(sheet);
    await workbook.xlsx.writeFile(config.excelFile);
  });
}

export async function overview() {
  const [seekers, employers, jobs] = await Promise.all([
    listSeekers(),
    listEmployers(),
    listJobs(),
  ]);
  return {
    seekers: seekers.length,
    employers: employers.length,
    jobs: jobs.length,
    recentSeekers: seekers.slice(0, 5),
    recentEmployers: employers.slice(0, 5),
  };
}

export async function listJobs() {
  try {
    const raw = await fs.readFile(config.jobsFile, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveJobs(jobs) {
  await fs.writeFile(config.jobsFile, `${JSON.stringify(jobs, null, 2)}\n`, "utf8");
  return jobs;
}

export async function upsertJob(job) {
  const jobs = await listJobs();
  const index = jobs.findIndex((item) => item.id === job.id);
  if (index >= 0) jobs[index] = job;
  else jobs.unshift(job);
  return saveJobs(jobs);
}

export async function deleteJob(id) {
  const jobs = await listJobs();
  return saveJobs(jobs.filter((job) => job.id !== id));
}

export function resumePath(storedName) {
  return path.join(config.resumesDir, storedName);
}

export { nowIst };
