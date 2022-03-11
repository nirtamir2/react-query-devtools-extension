import { defineManifest } from "rollup-plugin-chrome-extension";

export const manifest = defineManifest({
  manifest_version: 3,
  name: "React Query",
  version: "1.0.0",
  devtools_page: "devtools-page.html",
  icons: {
    16: "assets/images/logo-16.png",
    32: "assets/images/logo-32.png",
    64: "assets/images/logo-64.png",
    128: "assets/images/logo-128.png",
    256: "assets/images/logo-256.png",
  },
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
