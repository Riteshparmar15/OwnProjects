import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const config = {
  root,
  port: Number(process.env.PORT || 8787),
  adminUser: process.env.ADMIN_USER || "admin",
  adminPassword: process.env.ADMIN_PASSWORD || "ProStafff@2026",
  sessionSecret: process.env.SESSION_SECRET || "prostafff-local-secret",
  ownerEmail: process.env.OWNER_EMAIL || "ritesh.parmar1599@gmail.com",
  dataDir: path.join(root, "data"),
  resumesDir: path.join(root, "data", "resumes"),
  jobsFile: path.join(root, "data", "jobs.json"),
  excelFile: path.join(root, "data", "ProStafff-Records.xlsx"),
  distDir: path.join(root, "dist"),
  maxResumeBytes: 5 * 1024 * 1024,
};
