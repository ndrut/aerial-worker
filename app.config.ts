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
    },
    publicAssets: [
        {
            baseURL: "/",
            dir: "./public",
            maxAge: 60  * 60 * 24 * 7, // 7 days
        }
    ],
    routeRules: {
        "/fonts/**": {
            headers: {
              "cache-control": "public, max-age=31536000, immutable",
            },
          },
          "/favicon.ico": {
            headers: {
              "cache-control": "public, max-age=31536000, immutable",
            },
          },
    }
  }
});