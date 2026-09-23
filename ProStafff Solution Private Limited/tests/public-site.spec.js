import { test, expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const resume = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures", "resume.pdf");

test.describe("Public website", () => {
  test("TC-01 Home page renders brand, nav, and hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ProStafff Solution/);
    await expect(page.getByRole("heading", { name: /Empowering Leading Retail Brands/i })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Services" })).toBeVisible();
  });

  test("TC-02 Job board filters and Apply Now prefills the seeker form", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#jobs-grid article").first()).toBeVisible();

    await page.getByRole("button", { name: "Management" }).click();
    await expect(page.locator("#jobs-grid article")).not.toHaveCount(0);

    const firstTitle = (await page.locator("#jobs-grid h3").first().textContent())?.trim();
    await page.locator("#jobs-grid").getByRole("button", { name: "Apply Now" }).first().click();
    await expect(page.locator("#seeker-form")).toBeVisible();
    await expect(page.locator("#seeker-role")).toHaveValue(firstTitle || "");
  });

  test("TC-03 Job seeker form records details and resume", async ({ page }) => {
    const name = `Demo Candidate ${Date.now()}`;
    await page.goto("/");
    await page.locator("#tab-seeker").click();
    await page.locator("#seeker-name").fill(name);
    await page.locator("#seeker-email").fill("candidate@example.com");
    await page.locator("#seeker-phone").fill("+919876543210");
    await page.locator("#seeker-role").fill("Store Manager");
    await page.locator("#seeker-experience").selectOption("1-3 years");
    await page.locator("#seeker-resume").setInputFiles(resume);
    await page.locator("#seeker-drive").fill("https://drive.google.com/demo-resume");
    await page.locator("#seeker-bio").fill("Retail supervisor with store launch experience.");
    await page.locator("#seeker-form").getByRole("button", { name: "Submit Application" }).click();
    await expect(page.locator("#seeker-form [data-form-status]")).toContainText(/recorded by the company/i, { timeout: 20_000 });

    await page.goto("/admin.html");
    await page.locator("#admin-user").fill("admin");
    await page.locator("#admin-pass").fill("ProStafff@2026");
    await page.getByRole("button", { name: "Open dashboard" }).click();
    await page.getByRole("button", { name: "Candidates" }).click();
    await expect(page.locator("#seekers-table")).toContainText(name);
  });

  test("TC-04 Employer form records a hire-talent brief", async ({ page }) => {
    const company = `Demo Retail ${Date.now()}`;
    await page.goto("/");
    await page.locator("#tab-employer").click();
    await page.locator("#company-name").fill(company);
    await page.locator("#contact-person").fill("Priya Shah");
    await page.locator("#employer-email").fill("hiring@example.com");
    await page.locator("#employer-phone").fill("+918888777666");
    await page.locator("#staffing-type").selectOption("Seasonal");
    await page.locator("#openings-count").fill("12");
    await page.locator("#employer-message").fill("Need festive floor staff for two Mumbai stores.");
    await page.locator("#employer-form").getByRole("button", { name: "Request Talent" }).click();
    await expect(page.locator("#employer-form [data-form-status]")).toContainText(/recorded by the company/i, { timeout: 20_000 });
  });

  test("TC-05 Incomplete seeker form shows validation, not a fake success", async ({ page }) => {
    await page.goto("/");
    await page.locator("#tab-seeker").click();
    await page.locator("#seeker-form").getByRole("button", { name: "Submit Application" }).click();
    await expect(page.locator("#seeker-form [data-form-status]")).toContainText(/required fields/i);
  });
});
