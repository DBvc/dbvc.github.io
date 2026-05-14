import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://dbvc.xyz",
  build: {
    format: "file",
  },
  integrations: [sitemap()],
});
