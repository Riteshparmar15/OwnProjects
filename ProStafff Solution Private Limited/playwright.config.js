import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL: "http://localhost:5173",
    screenshot: "only-on-failure",
    video: "on",
    trace: "retain-on-failure",
    viewport: { width: 1440, height: 900 },
  },
  webServer: [
    {
      command: "node server/index.js",
      url: "http://localhost:8787/api/jobs",
      reuseExistingServer: true,
      timeout: 30_000,
    },
    {
      command: "npx vite --port 5173 --strictPort",
      url: "http://localhost:5173",
      reuseExistingServer: true,
      timeout: 30_000,
    },
  ],
  projects: [
    {
      name: "chromium",
      testIgnore: /demo-flow\.spec\.js/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "demo",
      testMatch: /demo-flow\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: { slowMo: 280 },
        video: "on",
      },
    },
  ],
});
