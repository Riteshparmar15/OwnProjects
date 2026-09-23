import { test, expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const resume = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures", "resume.pdf");

test.describe("Developer demo video", () => {
  test("DEMO Full visitor-to-company flow", async ({ page }) => {
    const stamp = Date.now();
    const candidate = `Video Demo Candidate ${stamp}`;
    const company = `Video Demo Retail ${stamp}`;
    const jobTitle = `Video Demo Role ${stamp}`;

    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Empowering Leading Retail Brands/i })).toBeVisible();
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About Us" }).click();
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Job Openings" }).click();
    await expect(page.locator("#jobs-grid article").first()).toBeVisible();
    await page.getByRole("button", { name: "Corporate" }).click();
    await page.getByRole("button", { name: "All" }).click();

    await page.locator("#tab-employer").click();
    await page.locator("#company-name").fill(company);
    await page.locator("#contact-person").fill("Anika Mehta");
    await page.locator("#employer-email").fill("talent@example.com");
    await page.locator("#employer-phone").fill("+911234567890");
    await page.locator("#staffing-type").selectOption("Permanent");
    await page.locator("#openings-count").fill("8");
    await page.locator("#employer-message").fill("Need store managers for a new Ahmedabad cluster.");
    await page.locator("#employer-form").getByRole("button", { name: "Request Talent" }).click();
    await expect(page.locator("#employer-form [data-form-status]")).toContainText(/recorded by the company/i);

    await page.locator("#tab-seeker").click();
    await page.locator("#seeker-name").fill(candidate);
    await page.locator("#seeker-email").fill("video.candidate@example.com");
    await page.locator("#seeker-phone").fill("+919999888777");
    await page.locator("#seeker-role").fill("Store Manager");
    await page.locator("#seeker-experience").selectOption("3-7 years");
    await page.locator("#seeker-resume").setInputFiles(resume);
    await page.locator("#seeker-drive").fill("https://drive.google.com/video-demo");
    await page.locator("#seeker-bio").fill("Seven years in lifestyle retail, including two store launches.");
    await page.locator("#seeker-form").getByRole("button", { name: "Submit Application" }).click();
    await expect(page.locator("#seeker-form [data-form-status]")).toContainText(/recorded by the company/i);

    await page.goto("/admin.html");
    await page.locator("#admin-user").fill("admin");
    await page.locator("#admin-pass").fill("ProStafff@2026");
    await page.getByRole("button", { name: "Open dashboard" }).click();
    await expect(page.locator("#app-shell")).toBeVisible();
    await page.getByRole("button", { name: "Candidates" }).click();
    await expect(page.locator("#seekers-table")).toContainText(candidate);

    await page.getByRole("button", { name: "Employers" }).click();
    await expect(page.locator("#employers-table")).toContainText(company);

    await page.getByRole("button", { name: "Job openings" }).click();
    await expect(page.locator("#view-jobs")).toBeVisible();
    await page.locator("#job-title").fill(jobTitle);
    await page.locator("#job-location").fill("Surat, Gujarat");
    await page.locator("#job-description").fill("Demo job published from the company dashboard.");
    await page.locator("#job-save").click();
    await expect(page.locator("#jobs-table")).toContainText(jobTitle);

    await page.goto("/");
    await expect(page.locator("#jobs-grid")).toContainText(jobTitle);
  });
});
