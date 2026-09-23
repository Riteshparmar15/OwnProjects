import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  base: "./",
  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api": "http://localhost:8787",
    },
    watch: {
      ignored: ["**/data/**", "**/test-results/**", "**/playwright-report/**"],
    },
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: path.join(root, "index.html"),
        admin: path.join(root, "admin.html"),
      },
    },
  },
});
