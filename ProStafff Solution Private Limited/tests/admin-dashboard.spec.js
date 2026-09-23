import { test, expect } from "@playwright/test";

test.describe("Company dashboard", () => {
  test("TC-06 Wrong password is rejected", async ({ page }) => {
    await page.goto("/admin.html");
    await page.locator("#admin-user").fill("admin");
    await page.locator("#admin-pass").fill("wrong-password");
    await page.getByRole("button", { name: "Open dashboard" }).click();
    await expect(page.locator("#login-status")).toContainText(/incorrect/i);
    await expect(page.locator("#login-screen")).toBeVisible();
  });

  test("TC-07 Admin can sign in and open records", async ({ page }) => {
    await page.goto("/admin.html");
    await page.locator("#admin-user").fill("admin");
    await page.locator("#admin-pass").fill("ProStafff@2026");
    await page.getByRole("button", { name: "Open dashboard" }).click();
    await expect(page.locator("#app-shell")).toBeVisible();
    await expect(page.locator("#stat-jobs")).not.toHaveText("");
    await page.getByRole("button", { name: "Candidates" }).click();
    await expect(page.locator("#seekers-table")).toBeVisible();
    await page.getByRole("button", { name: "Employers" }).click();
    await expect(page.locator("#employers-table")).toBeVisible();
  });

  test("TC-08 Admin can publish a job and the public site shows it", async ({ page }) => {
    const title = `Demo Floor Lead ${Date.now()}`;
    await page.goto("/admin.html");
    await page.locator("#admin-user").fill("admin");
    await page.locator("#admin-pass").fill("ProStafff@2026");
    await page.getByRole("button", { name: "Open dashboard" }).click();
    await expect(page.locator("#app-shell")).toBeVisible();
    await page.getByRole("button", { name: "Job openings" }).click();
    await expect(page.locator("#view-jobs")).toBeVisible();

    await page.locator("#job-title").fill(title);
    await page.locator("#job-location").fill("Ahmedabad, Gujarat");
    await page.locator("#job-category").selectOption("in-store");
    await page.locator("#job-type").selectOption("Permanent");
    await page.locator("#job-description").fill("Lead a high-street store team through festive trading.");
    await page.locator("#job-save").click();
    await expect(page.locator("#job-status")).toContainText(/now live/i);
    await expect(page.locator("#jobs-table")).toContainText(title);

    await page.goto("/");
    await expect(page.locator("#jobs-grid")).toContainText(title);
  });

  test("TC-09 Admin can edit an existing job title", async ({ page }) => {
    await page.goto("/admin.html");
    await page.locator("#admin-user").fill("admin");
    await page.locator("#admin-pass").fill("ProStafff@2026");
    await page.getByRole("button", { name: "Open dashboard" }).click();
    await expect(page.locator("#app-shell")).toBeVisible();
    await page.getByRole("button", { name: "Job openings" }).click();
    await expect(page.locator("#view-jobs")).toBeVisible();
    await page.locator("#jobs-table").getByRole("button", { name: "Edit" }).first().click();
    const current = await page.locator("#job-title").inputValue();
    expect(current.length).toBeGreaterThan(2);
    const updated = `${current} Updated`;
    await page.locator("#job-title").fill(updated);
    await page.locator("#job-save").click();
    await expect(page.locator("#jobs-table")).toContainText(updated);
  });
});
