import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: path.resolve(__dirname, "src/test/setupTests.js"),
    css: true,
    include: ["src/**/*.{test,spec}.{js,jsx}"]
  }
});
