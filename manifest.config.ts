import { defineManifest } from "rollup-plugin-chrome-extension";

export const manifest = defineManifest({
  manifest_version: 3,
  name: "React Query",
  version: "1.0.0",
  devtools_page: "devtools-page.html",
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  content_scripts: [
    {
      js: ["src/content.ts"],
      matches: ["<all_urls>"],
      run_at: "document_end",
    },
  ],
});
