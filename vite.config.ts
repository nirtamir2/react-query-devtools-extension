import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { chromeExtension } from "rollup-plugin-chrome-extension";
import { defineConfig } from "vite";
import { manifest } from "./manifest.config";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "devtools-page.html"),
        devtools: resolve(__dirname, "devtools-panel.html"),
      },
    },
  },
  plugins: [react(), chromeExtension({ manifest })],
  optimizeDeps: {
    include: ["webextension-polyfill"],
  },
});
