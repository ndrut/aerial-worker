import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "cloudflare-pages",
    compressPublicAssets: true,
    prerender: {
        crawlLinks: true
    },
    rollupConfig: {
      external: ["node:async_hooks"]
    }
  }
});